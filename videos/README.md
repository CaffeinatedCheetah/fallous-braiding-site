# Videos

`videos.json` contains the list of TikTok video embeds shown in the Videos section of the site.

## Format

```json
[
  {
    "id": "7380000000000000000",
    "caption": "Box braids transformation 💫",
    "category": "box"
  }
]
```

Fields:
- `id` — TikTok video ID (the number at the end of the TikTok URL)
- `caption` — text displayed below the embed
- `category` — optional filter tag (e.g. `box`, `cornrows`, `twists`, `locs`, `fulani`, `kids`)

To add a video, paste the TikTok URL, copy the ID from the end, and add an entry here.
