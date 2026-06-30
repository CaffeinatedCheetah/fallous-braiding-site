# Gallery photos

Drop real photo files (jpg/png) directly into this folder, then add one entry
per photo to `gallery.json` so the website knows about it.

## Adding a new photo

1. Upload the image file into this folder via GitHub (Add file → Upload files)
2. Open `gallery.json`, add a new entry to the array:

```json
{ "file": "your-photo-filename.jpg", "cat": "box", "label": "Knotless Box Braids" }
```

3. Commit. Netlify auto-redeploys, and the photo appears in the live gallery
   for every visitor on every device — no admin login needed.

## Valid `cat` values (must match the site's filter tabs)
- `box` — Box Braids
- `cornrows` — Cornrows
- `twists` — Twists
- `locs` — Locs
- `fulani` — Fulani
- `kids` — Kids

## Notes
- Photos here are permanent and visible to everyone — use this for the
  salon's real portfolio shots.
- The admin dashboard's photo upload (admin.html) is still available for
  quick, temporary additions from whichever device is logged in, but those
  only show on that same browser/device until uploaded here too.
- Delete a photo by removing its file and its `gallery.json` entry, then commit.
