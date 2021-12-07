# Started Pack

Based on [Parcel](https://parceljs.org/) \
Have [Swiper](https://swiperjs.com/) \
Build-in [TypeScript](https://www.typescriptlang.org/)

## Getting Started

Install dependencies

```bash
yarn install
```

## Scripts

`yarn del` – clean build folder \
`yarn dev` – run development server (port 3000) \
`yarn serve` – same as `yarn dev` with opening in browser \
`yarn build` – uncompressed project build (see **stage target** in package.json) \
`yarn prod` – production build (see **prod target** in package.json) \

## Content

<table>
<tr>
   <th>File</th>
   <th>Description</th>
</tr>
<tr>
   <th>./src/fonts/</th>
   <td>Put fonts here (ttf, woff, woff2, eot, etc)</td>
</tr>
<tr>
   <th>./src/html/components/</th>
   <td>Independent (isolated) blocks.</td>
</tr>
<tr>
   <th>./src/html/core/</th>
   <td>Contains global html part (head).</td>
</tr>
<tr>
   <th>./src/html/parts/</th>
   <td>Repeatable sections (header, footer).</td>
</tr>
<tr>
   <th>./src/html/*.html</th>
   <td>Used for pages.</td>
</tr>
<tr>
   <th>./src/img/</th>
   <td>Public static media.</td>
</tr>
<tr>
   <th>./src/js/</th>
   <td>Javascript modules (init.js – entry point).</td>
</tr>
<tr>
   <th>./src/scss/addons/</th>
   <td>Used for decoration (animation, transition).</td>
</tr>
<tr>
   <th>./src/scss/components/</th>
   <td>Isolated blocks (may merged into the folder, such as buttons, inputs).</td>
</tr>
<tr>
   <th>./src/scss/helpers/</th>
   <td>Core dependencies (functions, behavior mixins, media queries, style mixins, text formatting rules).</td>
</tr>
<tr>
   <th>./src/scss/pages/</th>
   <td>Styling separate pages.</td>
</tr>
<tr>
   <th>./src/scss/theme/</th>
   <td>Contains whole color scheme.</td>
</tr>
<tr>
   <th>./src/scss/404.scss</th>
   <td>Only 404 styling (according performance issues).</td>
</tr>
<tr>
   <th>./src/ts/</th>
   <td>Typescript modules (init.ts – entry point).</td>
</tr>

</table>

### Hierarchy

```bash
src/
│
├─── fonts/
│     │── ...
│     └── *.{ttf|woff|woff2|eot}
│
├─── html/
│     │── components/ #reusable blocks (ex., blog-post, events-item)
│     │── core/ #core templates (ex., <head>)
│     │── parts/ #page parts(ex., header, footer)
│     │── 404.html
│     │── contact.html
│     │── index.html
│     └── *.html
│
├─── img/
│
├─── js/
│     │── *.js
│     └── init.js
│
├─── ts/
│     │── *.ts
│     └── init.ts
│
├─── scss/
│     │── addons/
│     │     │── _animation.scss
│     │     │── _hover.scss
│     │     │── ...
│     │     └── index.scss
│     │
│     │── components/
│     │     │── _button.scss
│     │     │── _cards.scss
│     │     │── _containers.scss
│     │     │── ...
│     │     └── index.scss
│     │
│     │
│     │── helpers/
│     │     │── _formatting.scss
│     │     │── _functions.scss
│     │     │── _media.scss #queries mixins
│     │     │── _mixins.scss
│     │     │── _styling.scss #stylish mixins
│     │     └── index.scss
│     │
│     │
│     │── pages/
│     │     │── _404.scss
│     │     │── ...
│     │     │── _home.scss
│     │     └── index.scss
│     │
│     │── theme/
│     │     │── _colors.scss #define all colors
│     │     │── _dark.scss
│     │     │── _light.scss
│     │     └── index.scss #include theme
│     │
│     │── 404.scss
│     │── fonts.scss
│     │── main.scss #core entry
│     │── reset.scss
│     │── theme-dark.scss
│     │── theme-light.scss
│     └── theme.scss #default color theme

```

## Development

Run with one of commands:

```bash
yarn dev
```

```bash
yarn serve
```

Live server link will displayed after a while:

```bash
❯ parcel serve src/html/*.html  --no-cache --port 3000
Server running at http://localhost:3000
✨ Built in 446ms
```

### Modify dependencies

In `/src/html/core/head.html` linked all resources (global):

```html
<head>
	...
	<link rel="stylesheet" href="../scss/reset.scss" />
	<link rel="stylesheet" href="../scss/fonts.scss" />
	<link rel="stylesheet" href="../scss/main.scss" />
	<link rel="stylesheet" href="../scss/theme.scss" />
	<script src="../ts/init.ts" type="module"></script>
	<script src="../js/init.js" type="module"></script>
	...
</head>
```

## Building-up

Commands defined in `package.json` -> `scripts`:

```json
"scripts": {
   "del": "del-cli .parcel-cache dev dist --force",
   "dev": "parcel serve src/html/*.html  --no-cache --port 3000",
   "serve": "parcel serve src/html/*.html  --no-cache --port 3000 --open",
   "build": "del-cli dist --force && parcel build src/html/*.html --target stage --no-cache",
   "prod": "del-cli dist --force && parcel build src/html/*.html --target prod --no-cache --detailed-report 32"
}
```

### Destination directory

Settings declared in `package.json` -> `targets`:

```json
"targets": {
   "stage": {
      "engines": {
         "browsers": "> last 4 versions, not dead"
      },
      "distDir": "./dist",
      "context": "browser",
      "outputFormat": "global",
      "isLibrary": false,
      "optimize": true,
      "includeNodeModules": true,
      "scopeHoist": true,
      "sourceMap": true
   },
   "prod": {
      "engines": {
         "browsers": "> 0.5%, last 10 versions, not dead"
      },
      "distDir": "./dist",
      "context": "browser",
      "outputFormat": "global",
      "isLibrary": false,
      "optimize": true,
      "includeNodeModules": true,
      "scopeHoist": true,
      "sourceMap": false
   },
   "main": false
}
```

## Dependencies

Grab latest version as a default.

```json
"devDependencies": {
   "@parcel/transformer-sass": "latest",
   "del-cli": "latest",
   "parcel": "latest",
   "posthtml-doctype": "latest",
   "posthtml-include": "latest",
   "sass": "latest",
   "sharp": "latest",
   "swiper": "latest",
   "typescript": "latest"
}
```

If you have any troubles with `latest` version try this:

```json
"devDependencies": {
   "@parcel/transformer-sass": "^2.0.1",
   "del-cli": "^4.0.1",
   "parcel": "^2.0.1",
   "posthtml-doctype": "^1.1.1",
   "posthtml-include": "^1.7.2",
   "sass": "^1.44.0",
   "sharp": "^0.29.3",
   "swiper": "^7.3.1",
   "typescript": "^4.5.2"
}
```
