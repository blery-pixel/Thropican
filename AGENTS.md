# AGENTS.md

Guidance for AI coding agents working on this repository.

## Project
Thropican Natural Juices: a static, no-build, one-page juice shop (Morocco, prices in DH).
Plain HTML + CSS + vanilla JavaScript. No bundler, no framework. `package.json` exists only to run a dev server (`http-server`).

## Run
Serve over HTTP (the 3D model is loaded with `fetch`, so `file://` will not work):

    npm install && npm run dev      # http-server on http://localhost:8000
    # or: python3 -m http.server 8000

There are no tests or build steps. Check changes in the browser and the console.

## Layout
- `index.html`: markup only. Scripts load in this order, and it matters:
  three.js, OrbitControls, GLTFLoader (CDN), then `js/stand-3d.js`,
  `js/products.js`, `js/maker-nav.js`, `js/qr-lib.js`, `js/cart.js`, `js/road-toggle.js`.
- `css/styles.css`: all styles. Colors are CSS variables on `:root` with a dark-mode override
  (`prefers-color-scheme` and `[data-theme]`).
- `js/stand-3d.js`: 3D hero intro, loads `assets/model/stand.glb`.
- `js/products.js`: defines globals `IMG` (image paths) and `P` (product list), renders the
  Tropics list, nav highlighting, dropdowns, newsletter dialog.
- `js/maker-nav.js`: "Make Your Own" builder.
- `js/qr-lib.js`: third-party QR encoder. Do not edit; keep its license header.
- `js/cart.js`: basket, checkout, simulated order tracking. Exposes `window.Cart`.
  Config at the top: `PRICE`, `WHATSAPP`, `PAY_URL`.
- `js/road-toggle.js`: "Pick to Deliver" road toggle.
- `assets/`: images and the `.glb` model.

## Conventions
- Each script is an IIFE (except `products.js` globals). Keep new code in the same ES5-style
  (`var`, `function`), no modules, no build-only syntax.
- Elements are looked up by id with a local `$ = document.getElementById`. Section jumps use
  `data-go="<id>"`; placeholder links use `data-soon`.
- Cart state is stored in `localStorage` (`thr_cart_v1`, `thr_order_v1`). Wrap storage access in try/catch.
- Keep accessibility attributes (aria-labels, focus styles) and reduced-motion handling.
- Add product photos as files under `assets/images/products/` and register them in `IMG`.
  Never inline base64 into HTML or JS.
- The page can only load external scripts from CDNs already used; avoid new network dependencies.

## Do not
- Do not change `LICENSE` or remove `THIRD-PARTY-NOTICES.md`. This project is proprietary
  (all rights reserved); bundled third-party code keeps its own license.
- Do not commit real payment links, WhatsApp numbers or secrets without the owner's approval.
- Do not present demo features (simulated payment, simulated tracking) as real.
