import {
  AfterViewInit,
  Component,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  TemplateRef,
  ViewChild,
  Output,
  EventEmitter
  } from '@angular/core';
import {
  LyOverlay,
  LyTheme2,
  OverlayFactory,
  Placement,
  Positioning,
  shadowBuilder,
  ThemeVariables,
  XPosition,
  YPosition
  } from '@alyle/ui';
import {
  trigger,
  style,
  animate,
  transition,
  keyframes,
} from '@angular/animations';

const STYLE_PRIORITY = -1;
const DEFAULT_PLACEMENT = YPosition.below;
const DEFAULT_XPOSITION = XPosition.after;

const STYLES = (theme: ThemeVariables) => ({
  $priority: STYLE_PRIORITY,
  root: {
    '&': theme.menu ? theme.menu.root : null
  },
  container: {
    background: theme.background.primary.default,
    borderRadius: '2px',
    boxShadow: shadowBuilder(4),
    display: 'block',
    paddingTop: '8px',
    paddingBottom: '8px',
    transformOrigin: 'inherit',
    pointerEvents: 'all',
    overflow: 'auto',
    maxHeight: 'inherit',
    maxWidth: 'inherit',
    boxSizing: 'border-box'
  },
  item: {
    display: 'flex',
    minHeight: '48px',
    borderRadius: 0,
    width: '100%',
    justifyContent: 'flex-start'
  }
});

const ANIMATIONS = [
  trigger('menuEnter', [
    transition('void => in', [
      animate('125ms cubic-bezier(0, 0, 0.2, 1)', keyframes([
        style({
          opacity: 0,
          transform: 'scale(0.8)'
        }),
        style({
          opacity: 1,
          transform: 'scale(1)'
        })
      ]))
    ]),
  ]),
  trigger('menuLeave', [
    transition('* => void', animate('150ms linear', style({ opacity: 0 })))
  ])
];

/** Menu container */
@Component({
  selector: 'ly-menu',
  animations: [...ANIMATIONS],
  templateUrl: 'menu.html',
  exportAs: 'lyMenu'
})
export class LyMenu implements OnInit, AfterViewInit {
  /**
   * styles
   * @docs-private
   */
  readonly classes = this._theme.addStyleSheet(STYLES);
  /**
   * Destroy menu
   * @docs-private
   */
  destroy: () => void;
  @ViewChild('container', { static: false }) _container: ElementRef<HTMLDivElement>;
  @Input() ref: LyMenuTriggerFor & { };

  /** Position where the menu will be placed. */
  @Input() placement: Placement;

  /** The x-axis position of the menu. */
  @Input() xPosition: XPosition;

  /** The y-axis position of the menu. */
  @Input() yPosition: YPosition;

  @HostBinding('@menuLeave') menuLeave2;
  @HostListener('@menuLeave.done', ['$event']) endAnimation(e) {
    if (e.toState === 'void') {
      this.ref.destroy();
    }
  }
  constructor(
    private _theme: LyTheme2,
    private _el: ElementRef,
    private _renderer: Renderer2
  ) {
    this._renderer.addClass(this._el.nativeElement, this.classes.root);
  }

  ngOnInit() {
    if (!this.ref) {
      throw new Error('LyMenu: require @Input() ref');
    }
    if (!this.placement && !this.xPosition && !this.yPosition) {
      this.xPosition = DEFAULT_XPOSITION;
      this.placement = DEFAULT_PLACEMENT;
    }
  }

  ngAfterViewInit() {
    if (this.ref._menuRef) {
      this.ref._menuRef.onResizeScroll = this._updatePlacement.bind(this);
    }
    this._updatePlacement();
    this.ref.menuOpened.emit();
    Promise.resolve(null).then(() => {
      this.ref._setMenuOpenToTrue();
    });
  }

  private _updatePlacement () {
    const el = this.ref._menuRef!.containerElement as HTMLElement;
    const container = this._container.nativeElement;

    // reset height & width
    this._renderer.setStyle(container, 'height', 'initial');
    this._renderer.setStyle(container, 'width', 'initial');

    const position = new Positioning(this.placement, this.xPosition, this.yPosition, this.ref._getHostElement(), el, this._theme.variables);

    // set position
    this._renderer.setStyle(el, 'transform', `translate3d(${position.x}px, ${position.y}px, 0)`);
    this._renderer.setStyle(this._el.nativeElement, 'transform-origin', `${position.ox} ${position.oy} 0`);

    // set height & width
    this._renderer.setStyle(container, 'height', position.height === 'initial' ? '100%' : position.height);
    this._renderer.setStyle(container, 'width', position.width === 'initial' ? '100%' : position.width);
  }
}

@Directive({
  selector: '[ly-menu-item]'
})
export class LyMenuItem {
  @HostListener('click') _click() {
    if (this._menu.ref && this._menu.ref._menuRef) {
      this._menu.ref.closeMenu();
    }
  }
  constructor(
    @Optional() private _menu: LyMenu,
    el: ElementRef,
    renderer: Renderer2
  ) {
    renderer.addClass(el.nativeElement, _menu.classes.item);
  }
}

@Directive({
  selector: '[lyMenuTriggerFor]',
  host: {
    '(click)': '_handleClick()'
  },
  exportAs: 'lyMenuTriggerFor'
})
export class LyMenuTriggerFor implements OnDestroy {
  /** Current menuRef */
  _menuRef?: OverlayFactory | null;
  private _menuOpen = false;

  /** Whether the menu is open. */
  get menuOpen() {
    return this._menuOpen;
  }

  @Input() lyMenuTriggerFor: TemplateRef<any>;

  @Output() readonly menuOpened = new EventEmitter<void>();
  @Output() readonly menuClosed = new EventEmitter<void>();

  constructor(
    private elementRef: ElementRef,
    private overlay: LyOverlay
  ) { }

  ngOnDestroy() {
    this.closeMenu();
  }

  _handleClick() {
    this.toggleMenu();
  }

  /** Opens the menu */
  openMenu() {
    if (!this._menuRef) {
      this._menuRef = this.overlay.create(this.lyMenuTriggerFor, {
        $implicit: this
      }, {
        styles: {
          top: 0,
          left: 0,
          pointerEvents: null
        },
        fnDestroy: this.detach.bind(this)
      });
    }
  }

  /** Closes the menu */
  closeMenu() {
    this.detach();
  }

  /** Toggle menu */
  toggleMenu() {
    if (this._menuRef) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  /** @docs-private */
  detach() {
    if (this._menuRef) {
      this._menuRef.detach();
    }
  }

  /** @docs-private */
  destroy() {
    if (this._menuRef) {
      this.menuClosed.emit(null!);
      this._menuRef.remove();
      this._menuRef = null;
      Promise.resolve(null).then(() => this._menuOpen = false);
    }
  }

  _getHostElement() {
    return this.elementRef.nativeElement;
  }

  _setMenuOpenToTrue() {
    this._menuOpen = true;
  }

}
