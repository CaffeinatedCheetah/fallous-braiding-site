# Gallery Images

Drop photos here using this naming convention:

```
<category>_<description>.jpg
```

Valid category prefixes:
- `box` — Box braids
- `cornrows` — Cornrows
- `twists` — Twists
- `locs` — Locs
- `fulani` — Fulani braids
- `kids` — Kids styles

Examples:
```
box_long-brown.jpg
cornrows_feed-in-style.jpg
kids_protective-twists.jpg
```

Files without a recognised prefix still show in the gallery under the "All" filter.

`generate-gallery.js` runs automatically on every Netlify deploy and builds `gallery.json` from whatever images are in this folder — no manual editing required.
