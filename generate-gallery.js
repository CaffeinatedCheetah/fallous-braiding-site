// generate-gallery.js
// Runs automatically before every Netlify deploy (see netlify.toml build command).
// Scans images/gallery/ and builds gallery.json from the filenames — no manual
// editing required. Just drop a photo in named like "box_my-photo.jpg" and
// it's picked up automatically.
//
// Valid category prefixes (must match the site's filter tabs):
//   box, cornrows, twists, locs, fulani, kids
// If a file doesn't start with one of those + an underscore, it's filed
// under "all" (still shows in the gallery, just not under a specific filter).

const fs = require('fs');
const path = require('path');

const GALLERY_DIR = path.join(__dirname, 'images', 'gallery');
const MANIFEST_PATH = path.join(GALLERY_DIR, 'gallery.json');
const VALID_CATS = ['box', 'cornrows', 'twists', 'locs', 'fulani', 'kids'];
const IMAGE_EXT = /\.(jpe?g|png|webp|gif)$/i;

function titleCase(str) {
  return str
    .replace(/[-_]+/g, ' ')
    .trim()
    .replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}

function build() {
  if (!fs.existsSync(GALLERY_DIR)) {
    console.log('No images/gallery directory found — skipping gallery manifest generation.');
    return;
  }

  const files = fs.readdirSync(GALLERY_DIR).filter(f => IMAGE_EXT.test(f));

  const items = files.map(file => {
    const base = file.replace(IMAGE_EXT, '');
    const match = VALID_CATS.find(cat => base.toLowerCase().startsWith(cat + '_'));
    const cat = match || 'all';
    const labelSource = match ? base.slice(match.length + 1) : base;
    const label = titleCase(labelSource) || titleCase(match || 'Photo');
    return { file, cat, label };
  });

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(items, null, 2) + '\n');
  console.log(`Generated gallery.json with ${items.length} photo(s).`);
}

build();
