# Gallery photos — just drop the file in

No JSON to edit. Name the photo with its category, upload it here, commit.
That's it.

## How to name files

`category_anything.jpg`

Examples:
- `box_long-knotless.jpg`
- `cornrows_tribal-style.jpg`
- `twists_senegalese.jpg`
- `locs_faux-locs-1.jpg`
- `fulani_classic.jpg`
- `kids_first-style.jpg`

Valid category prefixes: `box`, `cornrows`, `twists`, `locs`, `fulani`, `kids`

If you don't use one of those prefixes, the photo still shows up in the
gallery, just under "All" instead of a specific filter tab.

## Steps

1. GitHub → this folder (`images/gallery`) → **Add file → Upload files**
2. Drag in the photo, named like above
3. Commit
4. Netlify rebuilds automatically and the photo appears live for every visitor

No `gallery.json` editing — it's generated automatically at build time from
whatever files are sitting in this folder.

## Removing a photo

Delete the file from this folder and commit. It disappears from the site on
the next deploy.
