> This project is in the development stage. [![npm version](https://badge.fury.io/js/artis.svg)](https://badge.fury.io/js/artis)

> Thanks for support and feedback! [![npm downloads](https://img.shields.io/npm/dm/artis.svg)](https://www.npmjs.com/package/artis)

<p align="center">
  <img src="https://raw.githubusercontent.com/artis-tool/artis.js/main/banner.png" width="auto" alt="Artis JS">
</p>

---

# A low-level and functional virtual CSS library with no CSS codes. More than 80 Utilities. Infinite Configurations.

## Introduction

**Artis** is a tiny [**1.4 kilobytes**](https://bundlephobia.com/package/artis@1.0.2) Virtual CSS javascript library inspired from Virtual DOM. Use the [custom syntax](#api-introduction) in the component styling without actually writing the CSS code, and never increase your project file size by adding CSS codes.

[![Netlify Status](https://api.netlify.com/api/v1/badges/2acf9480-5e02-4dc7-bb61-e2c8dc6255ff/deploy-status)](https://app.netlify.com/sites/artisjs/deploys)

### Benefits

- No tree-shaking CSS classes
- No Extra CSS bundling
- No CSS blocking
- No CSS codes
- Fast render

## Getting Started

```bash
$ npm i artis --save-dev
```

## Playground

The [Playground](https://artisjs.netlify.app/playground/) is an online code editor, you can use it for testing or just playing around with `Artis.js` on the go. _If you don't find the **CLI** is more convenient._

[**Launch Playground**](https://artisjs.netlify.app/playground/) now!

- Press **F1** to open Palette menu to access advanced options.
- Press **Reset** button to delete data stored in the browser.

## API Introduction

`Artis.js` offers a very minimum learning curve to use the library, set the `design()` to **true** to enable CSS styling without writing CSS and no CSS payload. Up to 80+ different type of useful utilities and each utility has countless modifier that allows you to fine-tune the utility more precisely.

The Artis Syntax is look like below,

```
{utilityName}{:}{valueModifier}
```

Which is equilvalent to...

```html
<div class="textSize:40"></div>
```

```css
font-size: 40px;
```

```js
const style = "textSize:40 textColor:rgba(22,22,22,0.5)";
```

## Let's craft something!

Let's create 2 files below with Vanilla JS by using the native web component.

```js
// app.js
import { design } from "artis";

class MainComponent extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const style = `
      p:20
      m:20
      textSize:50
      bgColor:white
      curveRadius:20
    `;
    const tmpl = document.createElement("template");
    tmpl.innerHTML = `
      <div class="${style}">
        Hello World!
      </div>
    `;
    this.appendChild(tmpl.content.cloneNode(true));
    window.onload = () => design(true); // init artis.js
  }
}
customElements.define("main-component", MainComponent);
```

```html
<!-- index.html -->
<body class="m:0 p:0 textColor:black bgColor:white listStyle:none display:flex justifyContent:center alignItems:center">
  <main-component></main-component>
</body>
```

Create a group of complex styled components and reuse them anywhere in the project.

```js
// Example #3

// style.js
export const reset = "m:0 p:0 listStyle:none textSize:16 textColor:black bgColor:white"; // normalizer
export const center = "display:flex justifyContent:center alignItems:center";
export const centerCol = `${center} flexDirection:column`;
export const centerRow = `${center} flexDirection:row`;
export const paddingWide = "pt:60 pb:60 pl:20 pr:20";

// app.js
import {
  reset,
  center,
  centerCol,
  centerRow,
  paddingWide
} from "./styler";
```

That's all you need to learn to use `Artis.js`. Simply minimalist.

## API: Typography

| Utility | DOM Style Objects | Usage |
|:-|:-|:-|
| columnCount | _style.columnCount_ | [Reference](https://www.w3schools.com/jsref/prop_style_columncount.asp) |
| columnFill | _style.columnFill_ | [Reference](https://www.w3schools.com/jsref/prop_style_columnfill.asp) |
| columnGap | _style.columnGap_ | [Reference](https://www.w3schools.com/jsref/prop_style_columngap.asp) |
| columnRuleColor | _style.columnRuleColor_ | [Reference](https://www.w3schools.com/jsref/prop_style_columnrulecolor.asp) |
| columnRuleStyle | _style.columnRuleStyle_ | [Reference](https://www.w3schools.com/jsref/prop_style_columnrulestyle.asp) |
| columnRuleWidth | _style.columnRuleWidth_ | [Reference](https://www.w3schools.com/jsref/prop_style_columnrulewidth.asp) |
| columnSpan | _style.columnSpan_ | [Reference](https://www.w3schools.com/jsref/prop_style_columnspan.asp) |
| fontFamily | _style.fontFamily_ | [Reference](https://www.w3schools.com/jsref/prop_style_fontfamily.asp) |
| fontStyle | _style.fontStyle_ | [Reference](https://www.w3schools.com/jsref/prop_style_fontstyle.asp) |
| fontWeight | _vfontWeight_ | [Reference](https://www.w3schools.com/jsref/prop_style_fontweight.asp) |
| lineHeight | _style.lineHeight_ | 0px |
| listStyle | _style.listStyle_ | [Reference](https://www.w3schools.com/jsref/prop_style_liststyle.asp) |
| textAlign | _style.textAlign_ | [Reference](https://www.w3schools.com/jsref/prop_style_textalign.asp) |
| textColor | _style.color_ | rgba(0,0,0,0) |
| textDeco | _style.textDecoration_ | [Reference](https://www.w3schools.com/jsref/prop_style_textdecoration.asp) |
| textDecoColor | _style.textDecorationColor_ | [Reference](https://www.w3schools.com/jsref/prop_style_textdecorationcolor.asp) |
| textDirection | _style.direction_ | [Reference](https://www.w3schools.com/jsref/prop_style_direction.asp) |
| textOverflow | _style.textOverflow_ | [Reference](https://www.w3schools.com/jsref/prop_style_textoverflow.asp) |
| textSize | _style.fontSize_ | 0px |
| textTransform | _style.textTransform_ | [Reference](https://www.w3schools.com/jsref/prop_style_texttransform.asp) |
| whiteSpace | _style.whiteSpace_ | [Reference](https://www.w3schools.com/jsref/prop_style_whitespace.asp) |
| wordWrap | _style.wordWrap_ | [Reference](https://www.w3schools.com/jsref/prop_style_wordwrap.asp) |

## API: Backgrounds

| Utility | DOM Style Objects | Usage |
|:-|:-|:-|
| bgColor | _style.backgroundColor_ | rgba(0,0,0,0) |
| opacity | _style.opacity_ | [Opacity](https://www.w3schools.com/jsref/prop_style_opacity.asp) |

## API: Borders

| Utility | DOM Style Objects | Usage |
|:-|:-|:-|
| curveColor | _style.borderColor_ | rgba(0,0,0,0) |
| curveRadius | _style.borderRadius_ | 0px |
| curveStyle | _style.borderStyle_ | [Reference](https://www.w3schools.com/jsref/prop_style_borderstyle.asp) |
| curveWidth | _style.borderWidth_ | 0px |


## API: Sizing

| Utility | DOM Style Objects | Usage |
|:-|:-|:-|
| h | _style.height_ | 0px |
| w | _style.width_ | 0px |
| maxH | _style.maxHeight_ | [Reference](https://www.w3schools.com/jsref/prop_style_maxHeight.asp) |
| minH | _style.minHeight_ | [Reference](https://www.w3schools.com/jsref/prop_style_minheight.asp) |
| maxW | _style.maxWidth_ | [Reference](https://www.w3schools.com/jsref/prop_style_maxwidth.asp) |
| minW | _style.minWidth_ | [Reference](https://www.w3schools.com/jsref/prop_style_minwidth.asp) |
| vHeight | _style.height_ | [Reference](https://www.w3schools.com/jsref/prop_style_height.asp) |
| vWidth | _style.width_ | [Reference](https://www.w3schools.com/jsref/prop_style_width.asp) |

## API: Spacing

| Utility | DOM Style Objects | Usage |
|:-|:-|:-|
| m | _style.margin_ | 0px |
| ml | _style.marginLeft_ | 0px |
| mr | _style.marginRight_ | 0px |
| mt | _style.marginTop_ | 0px |
| mb | _marginBottom_ | 0px |
| p | _style.padding_ | 0px |
| pl | _style.paddingLeft_ | 0px |
| pr | _style.paddingRight_ | 0px |
| pt | _style.paddingTop_ | 0px |
| pb | _style.paddingBottom_ | 0px |

## API: Flex

| Utility | DOM Style Objects | Usage |
|:-|:-|:-|
| alignContent | _style.alignContent_ | [Reference](https://www.w3schools.com/jsref/prop_style_aligncontent.asp) |
| alignItems | _style.alignItems_ | 0px |
| alignSelf | _style.alignSelf_ | [Reference](https://www.w3schools.com/jsref/prop_style_alignself.asp) |
| flexBasis | _style.flexBasis_ | [Reference](https://www.w3schools.com/jsref/prop_style_flexbasis.asp) |
| flexDefault | _style.flex_ | [Reference](https://www.w3schools.com/jsref/prop_style_flex.asp) |
| flexDirection | _style.flexDirection_ | [Reference](https://www.w3schools.com/jsref/prop_style_flexdirection.asp) |
| flexGrow | _style.flexGrow_ | [Reference](https://www.w3schools.com/jsref/prop_style_flexgrow.asp) |
| flexShrink | _style.flexShrink_ | [Reference](https://www.w3schools.com/jsref/prop_style_flexshrink.asp) |
| flexWrap | _style.flexWrap_ | [Reference](https://www.w3schools.com/jsref/prop_style_flexwrap.asp) |
| justifyContent | _style.justifyContent_ | [Reference](https://www.w3schools.com/jsref/prop_style_justifycontent.asp) |
| order | _style.order_ | [Reference](https://www.w3schools.com/jsref/prop_style_order.asp) |

## API: Interactivity

| Utility | DOM Style Objects | Usage |
|:-|:-|:-|
| cursor | _style.cursor_ | [Reference](https://www.w3schools.com/jsref/prop_style_cursor.asp) |
| outlineColor | _style.outlineColor_ | [Reference](https://www.w3schools.com/jsref/prop_style_outlinecolor.asp) |
| outlineOffset | _style.outlineOffset_ | [Reference](https://www.w3schools.com/jsref/prop_style_outlineoffset.asp) |
| outlineStyle | _style.outlineStyle_ | [Reference](https://www.w3schools.com/jsref/prop_style_outlinestyle.asp) |
| outlineWidth | _style.outlineWidth_ | [Reference](https://www.w3schools.com/jsref/prop_style_outlinewidth.asp) |
| resize | _style.resize_ | [Refrence](https://www.w3schools.com/jsref/prop_style_resize.asp) |
| scroll | _style.scrollBehaviour_ | [Reference](https://www.w3schools.com/jsref/prop_style_scrollbehavior.asp) |
| select | _style.userSelect_ | [Reference](https://www.w3schools.com/jsref/prop_style_userselect.asp) |

## API: Layouts

| Utility | DOM Style Objects | Usage |
|:-|:-|:-|
| left | _style.left_ | 0px |
| right | _style.right_ | 0px |
| top | _style.top_ | 0px |
| bottom | _style.bottom_ | 0px |
| clear | _style.clear_ | [Reference](https://www.w3schools.com/jsref/prop_style_clear.asp) |
| display | _style.display_ | [Reference](https://www.w3schools.com/jsref/prop_style_display.asp) |
| float | _style.cssfloat_ | [Reference](https://www.w3schools.com/jsref/prop_style_cssfloat.asp) |
| overflow | _style.overflow_ | [Reference](https://www.w3schools.com/jsref/prop_style_overflow.asp) |
| overflowX | _style.overflowX_ | [Reference](https://www.w3schools.com/jsref/prop_style_overflowx.asp) |
| overflowY | _style.overflowY_ | [Reference](https://www.w3schools.com/jsref/prop_style_overflowy.asp) |
| imageFit | _style.objectFit_ | [Reference](https://www.w3schools.com/jsref/prop_style_objectfit.asp) |
| imagePosition | _style.objectPosition_ | [Reference](https://www.w3schools.com/jsref/prop_style_objectposition.asp) |
| position | _style.position_ | [Reference](https://www.w3schools.com/jsref/prop_style_position.asp) |
| clip | _style.clip_ | [Reference](https://www.w3schools.com/jsref/prop_style_clip.asp) |
| show | _style.visibility_ | [Reference](https://www.w3schools.com/jsref/prop_style_visibility.asp) |
| stack | _style.zIndex_ | [Reference](https://www.w3schools.com/jsref/prop_style_zindex.asp) |

## API: Filters

| Utility | DOM Style Objects | Usage |
|:-|:-|:-|
| filter | _style.filter_ | [Filter](https://www.w3schools.com/jsref/prop_style_filter.asp) |

## API: Transforms

| Utility | DOM Style Objects | Usage |
|:-|:-|:-|
| transform | _style.transform_ | [Reference](https://www.w3schools.com/jsref/prop_style_transform.asp) |

## API: Transitions

| Utility | DOM Style Objects | Usage |
|:-|:-|:-|
| transition | _style.transition_ | [Reference](https://www.w3schools.com/jsref/prop_style_transition.asp) |

---

Thanks for reading.

[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)
