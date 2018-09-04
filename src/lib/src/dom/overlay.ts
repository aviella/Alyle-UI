import { TemplateRef, EmbeddedViewRef, Injectable, ApplicationRef, ComponentFactoryResolver, Injector, ComponentRef, Type } from '@angular/core';
import { LyOverlayContainer, LyOverlayItem, LyOverlayBackdrop, WindowScrollService } from './overlay-container';
import { Subscription } from 'rxjs';

interface OverlayConfig {
  styles: Object;
  fnDestroy?: (...arg) => void;
  host?: any;
}

export interface OverlayFromTemplateRef {
  /** Detaches a view from dirty checking again of ApplicationRef.  */
  detach: () => void;

  /** Remove element of DOM */
  remove: () => void;

  /** Detach & remove */
  destroy: () => void;
}
class CreateFromTemplateRef implements OverlayFromTemplateRef {
  private _viewRef: EmbeddedViewRef<any>;
  private _el: any;
  private _compRef: ComponentRef<any>;
  private _compRefOverlayBackdrop: ComponentRef<any>;
  windowScrollSub: Subscription = Subscription.EMPTY;
  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _appRef: ApplicationRef,
    _templateRef: TemplateRef<any>,
    private _overlayContainer: LyOverlayContainer,
    _context: any,
    private _injector: Injector,
    windowScroll: WindowScrollService,
    config?: OverlayConfig
  ) {
    // this._viewRef = _templateRef.createEmbeddedView(_context);
    // this._viewRef.detectChanges();
    this._el = document.createElement('div');
    // this._viewRef.rootNodes.forEach(rootNode => container.appendChild(rootNode));
    const __styles = {
      position: 'absolute',
      zIndex: 1000,
      display: 'flex',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      ...config.styles
    };
    const newInjector = Injector.create([
      {
        provide: 'overlayConfig',
        useValue: <OverlayConfig>{
          fnDestroy: this.destroy.bind(this),
          ...config,
          styles: __styles,
        }
      }
    ], this._injector);

    this.updateStyles(__styles);
    if (config.host) {
      this.windowScrollSub = windowScroll.scroll$.subscribe((val) => {
        const rect = config.host.getBoundingClientRect();
        if (rect.top !== __styles.top || rect.left !== __styles.left) {
          const newStyles = {
            top: rect.top,
            left: rect.left
          };
          this.updateStyles(newStyles);
        }
      });
    }
    this._compRefOverlayBackdrop = this.generateComponent(LyOverlayBackdrop, newInjector);
    this._appRef.attachView(this._compRefOverlayBackdrop.hostView);
    const backdropEl = this._compRefOverlayBackdrop.location.nativeElement;
    this._overlayContainer._add(backdropEl);
    this._appendComponentToBody(_templateRef, _context, this._injector);

  }

  updateStyles(__styles) {
    /** Apply styles */
    /** set styles */
    for (const key in __styles) {
      if (__styles.hasOwnProperty(key)) {
        const styleVal = __styles[key];
        if (styleVal) {
          this._el.style[key] = typeof __styles[key] === 'number' ? `${styleVal}px` : styleVal;
        }
      }
    }
  }

  private _appendComponentToBody(type: TemplateRef<any> | Type<any>, context, injector: Injector) {
    if (type instanceof TemplateRef) {
      // Create a component reference from the component
      const viewRef = this._viewRef = type.createEmbeddedView(context || {});
      this._appRef.attachView(viewRef);

      // Get DOM element from component
      viewRef.rootNodes.forEach(_ => this._el.appendChild(_));

      // Append DOM element to the body
      this._overlayContainer._add(this._el);
    } else {
      this._compRef = this.generateComponent(type, injector);
      this._el = this._compRef.location.nativeElement;
      this._overlayContainer._add(this._el);
    }
  }

  generateComponent(type: Type<any>, injector: Injector) {
    const factory = this._componentFactoryResolver.resolveComponentFactory(type);
    return factory.create(injector);
  }

  detach() {
    if (this._viewRef) {
      this._appRef.detachView(this._viewRef);
    }
  }

  remove() {
    if (this._viewRef) {
      this._viewRef.destroy();
      this._overlayContainer._remove(this._el);
      this._el = null;
    } else if (this._compRef) {
      this._compRef.destroy();
      this._overlayContainer._remove(this._el);
      this._el = null;
    }
    if (this._compRefOverlayBackdrop) {
      this._appRef.detachView(this._compRefOverlayBackdrop.hostView);
      this._compRefOverlayBackdrop.destroy();
      const backdropEl = this._compRefOverlayBackdrop.location.nativeElement;
      this._overlayContainer._remove(backdropEl);
    }
    this.windowScrollSub.unsubscribe();
  }

  destroy() {
    this.detach();
    this.remove();
  }
}

@Injectable({
  providedIn: 'root'
})
export class LyOverlay {

  constructor(
    private _overlayContainer: LyOverlayContainer,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _appRef: ApplicationRef,
    private _injector: Injector,
    private _windowScroll: WindowScrollService
  ) { }

  create(template: TemplateRef<any>, context?: any, config?: OverlayConfig): OverlayFromTemplateRef {
    return new CreateFromTemplateRef(this._componentFactoryResolver, this._appRef, template, this._overlayContainer, context, this._injector, this._windowScroll, config);
  }
}
