import { Directive, Input, ElementRef, OnInit, OnChanges, Renderer2 } from '@angular/core';
import {
  LyTheme2,
  mixinBg,
  mixinColor,
  mixinElevation,
  mixinFlat,
  mixinOutlined,
  mixinRaised,
  mixinShadowColor,
  mixinStyleUpdater
  } from '@alyle/ui';

const STYLE_PRIORITY = -2;
const DEFAULT_SIZE = 40;
const DEFAULT_BG = 'background:base';
const STYLES = ({
  root: {
    display: 'inline-flex',
    position: 'relative',
    fontSize: '1.25em',
    flexShrink: 0,
    alignItems: 'center',
    userSelect: 'none',
    borderRadius: '50%',
    textAlign: 'center',
    justifyContent: 'center',
    '&>img': {
      width: '100%',
      height: '100%'
    }
  }
});

/** @docs-private */
export class LyAvatarBase {
  constructor(
    public _theme: LyTheme2
  ) { }
}

/** @docs-private */
export const LyAvatarMixinBase = mixinStyleUpdater(
  mixinBg(
    mixinFlat(
      mixinColor(
        mixinRaised(
          mixinOutlined(
            mixinElevation(
              mixinShadowColor(LyAvatarBase))))))));

@Directive({
  selector: 'ly-avatar',
  inputs: [
    'bg',
    'flat',
    'color',
    'raised',
    'outlined',
    'elevation',
    'shadowColor',
  ]
})
export class LyAvatar extends LyAvatarMixinBase implements OnChanges, OnInit {
  readonly classes = this._theme.addStyleSheet(STYLES, STYLE_PRIORITY);
  private _size: number;
  private _sizeClass: string;
  @Input()
  set size(val: number) {
    if (val !== this.size) {
      this._size = val;
      this._sizeClass = this._theme.addStyle(`lyAvatar.size:${val}`, {
        width: `${val}px`,
        height: `${val}px`,
      }, this._elementRef.nativeElement, this._sizeClass, STYLE_PRIORITY);
    }
  }
  get size() {
    return this._size;
  }
  constructor(
    theme: LyTheme2,
    renderer: Renderer2,
    private _elementRef: ElementRef
  ) {
    super(theme);
    this.setAutoContrast();
    renderer.addClass(_elementRef.nativeElement, this.classes.root);
  }

  ngOnChanges() {
    this.updateStyle(this._elementRef.nativeElement);
  }

  ngOnInit() {
    if (!this.bg) {
      this.bg = DEFAULT_BG;
      this.ngOnChanges();
    }
    if (!this.size) {
      this.size = DEFAULT_SIZE;
    }
  }
}
