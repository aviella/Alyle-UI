import {
  OnInit,
  Component,
  ComponentFactory,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  Injector,
  ApplicationRef,
  ComponentRef,
  EmbeddedViewRef,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  } from '@angular/core';
import { state, style, transition, animate, trigger, AnimationEvent } from '@angular/animations';
import { OverlayRef, LyTheme2, ThemeVariables, shadowBuilder } from '@alyle/ui';
import { Subject } from 'rxjs';

import { LyDialogRef } from './dialog-ref';
const STYLE_PRIORITY = -2;
const STYLES = (theme: ThemeVariables) => ({
  root: {
    backgroundColor: theme.background.primary.default,
    borderRadius: '4px',
    boxShadow: shadowBuilder(12),
    padding: '24px',
    overflow: 'auto',
    width: '100%',
    height: '100%',
    minHeight: 'inherit',
    maxHeight: 'inherit'
  }
});

/** @docs-private */
@Component({
  selector: 'ly-dialog-container',
  template: '<ng-template></ng-template>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('dialogContainer', [
      state('void, exit', style({opacity: 0, transform: 'scale(0.7)'})),
      state('enter', style({transform: 'none'})),
      transition('* => enter', animate('150ms cubic-bezier(0, 0, 0.2, 1)',
        style({transform: 'none', opacity: 1}))),
      transition('* => void, * => exit',
        animate('75ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({opacity: 0})))
    ])
  ],
  host: {
    '[@dialogContainer]': '_state',
    '(@dialogContainer.start)': '_onAnimationStart($event)',
    '(@dialogContainer.done)': '_onAnimationDone($event)'
  }
})
export class LyDialogContainer implements OnInit {
  readonly classes = this._theme.addStyleSheet(STYLES, STYLE_PRIORITY);
  private _embeddedViewRef: EmbeddedViewRef<any>;
  private _componentRef: ComponentRef<any>;

  /** @internal */
  readonly _afterOpened = new Subject<void>();
  /** @internal */
  readonly _beforeClosed = new Subject<any>();
  /** @internal */
  readonly _afterClosed = new Subject<any>();

  /**
   * State of the dialog animation.
   * @internal
   */
  _state: 'void' | 'enter' | 'exit' = 'enter';

  /** @internal */
  @ViewChild(TemplateRef, { read: ViewContainerRef }) private readonly viewContainerRef: ViewContainerRef;

  /** @internal */
  private _componentFactoryOrTemplate: ComponentFactory<any> | TemplateRef<any>;

  private _newInjector: Injector;

  constructor(
    private _appRef: ApplicationRef,
    private _overlayRef: OverlayRef,
    private _theme: LyTheme2,
    renderer: Renderer2,
    private _el: ElementRef<HTMLElement>,
  ) {
    renderer.addClass(_el.nativeElement, this.classes.root);
  }
  ngOnInit() {
    if (this._componentFactoryOrTemplate instanceof TemplateRef) {
      this._embeddedViewRef = this.viewContainerRef.createEmbeddedView(this._componentFactoryOrTemplate);
      this._appRef.attachView(this._embeddedViewRef);
    } else {
      this._componentRef = this.viewContainerRef.createComponent(this._componentFactoryOrTemplate, undefined, this._newInjector);
    }
  }

  /** @internal */
  _init(componentFactoryOrTemplate: ComponentFactory<any> | TemplateRef<any>, newInjector: Injector) {
    this._componentFactoryOrTemplate = componentFactoryOrTemplate;
    this._newInjector = newInjector;
  }

  /**
   * Start to close, starts the dialog exit animation.
   * @internal
   */
  _startClose() {
    this._state = 'exit';
  }

  _onAnimationStart(event: AnimationEvent) {
    if (event.toState === 'enter') {
      this._overlayRef.config!.onResizeScroll!();
    }
  }

  /** @internal */
  _onAnimationDone(event: AnimationEvent) {
    if (event.toState === 'exit') {
      const dialogRef = this._newInjector.get(LyDialogRef);
      this._destroy();
      this._overlayRef.ref.destroy();
      this._afterClosed.next(dialogRef.result);
      this._afterClosed.complete();
    } else if (event.toState === 'enter') {
      this._afterOpened.next();
      this._afterOpened.complete();
    }
  }

  private _destroy() {
    if (this._componentRef) {
      this._appRef.detachView(this._componentRef.hostView);
      this._componentRef.destroy();
    } else {
      this._appRef.detachView(this._embeddedViewRef);
      this._embeddedViewRef.detach();
      this._embeddedViewRef.destroy();
    }
  }

  /** @internal */
  _getHostElement() {
    return this._el.nativeElement;
  }
}