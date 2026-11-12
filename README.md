# Thropican Natural Juices

Static site split into separate files.

```
index.html              page markup
css/styles.css          all styles
js/stand-3d.js          3D hero (three.js, loads assets/model/stand.glb)
js/products.js          product data, image map, nav, newsletter dialog
js/maker-nav.js         "Make Your Own" juice builder
js/qr-lib.js            QR encoder (Kazuhiko Arase, MIT)
js/cart.js              basket, checkout, order tracking (prices, WHATSAPP, PAY_URL set here)
js/road-toggle.js       "Pick to Deliver" road toggle
assets/model/stand.glb  3D juice stand
assets/images/          logos and product photos
```

## Run
The 3D model is loaded with `fetch`, so open the site through a local server, not by double-click.

    npm install
    npm run dev          # opens http://localhost:8000

No Node? Use Python instead: `py -m http.server 8000` (Windows) or `python3 -m http.server 8000`.

three.js is loaded from the jsDelivr CDN (internet required).

## License
Proprietary, all rights reserved. See `LICENSE`. Third-party code is listed in `THIRD-PARTY-NOTICES.md`. Instructions for AI agents are in `AGENTS.md`.
