import { ThemeConfig, mergeDeep, shadowBuilder, lyl, StyleCollection } from '@alyle/ui';
import { MinimaBase } from './base';
import { Color } from '@alyle/ui/color';

const contrast = new Color(0xffffff);
const shadow = new Color(0, 0, 0, 1);
/**
 * @param
 */
export class MinimaDark extends MinimaBase implements ThemeConfig {
  name = 'minima-dark';
  primary = {
    default: new Color(0x1DE9B6),
    contrast: new Color(0, 0, 0, 0.87)
  };
  accent = {
    default: new Color(0x9C27B0),
    contrast
  };
  warn = {
    default: new Color(0xEA404C),
    contrast
  };
  disabled = {
    default: new Color(255, 255, 255, 0.3),
    contrast: new Color(255, 255, 255, 0.5)
  };
  action = {
    default: new Color(255, 255, 255, 0.70),
    contrast: new Color(0, 0, 0, 0.87)
  };
  background = {
    default: new Color(0x303030), // secondary
    primary: {
      default: new Color(0x242424),
      shadow
    },
    secondary: new Color(47, 47, 47),
    tertiary: new Color(65, 65, 65),
  };
  hover = new Color(255, 255, 255, 0.04);
  paper = {
    default: new Color(0x242424),
    shadow
  };
  text = {
    default: new Color(0xffffff),
    primary: new Color(0xffffff),
    secondary: new Color(255, 255, 255, 0.70),
    disabled: new Color(255, 255, 255, 0.50),
    hint: new Color(255, 255, 255, 0.50),
    dark: new Color(0x2b2b2b),
    light: new Color(0xffffff)
  };
  menu = {};
  drawer = {
    backdrop: new Color(49, 49, 49, .6)
  };
  bar = new Color(0x212121);
  divider = new Color(255, 255, 255, 0.12);
  colorShadow = shadow;
  shadow = shadow;
  field = mergeDeep({} , this.field, {
    borderColor: new Color(255, 255, 255, 0.12),
    labelColor: new Color(255, 255, 255, 0.4),
    appearance: {
      filled: {
        '& {container}': {
          backgroundColor: new Color(255, 255, 255, 0.04),
        }
      }
    }
  });
  snackBar = {
    root: new StyleCollection(lyl `{
      background: ${new Color(0xfafafa)}
      color: ${new Color(0, 0, 0, .87)}
      boxShadow: ${shadowBuilder(4, new Color(0xfafafa))}
    }`)
  };
  tooltip = {
    root: {
      background: new Color(250, 250, 250, 0.85).css(),
      color: new Color(0, 0, 0, .87).css()
    }
  };
}
