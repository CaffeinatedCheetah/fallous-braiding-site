# TikTok videos — paste the link, you're done

No app registration, no API keys, no OAuth. Just the video link.

## How to add a video

1. On TikTok, open the video → **Share → Copy link**
2. Open `videos.json` in this folder
3. Add the link to the array:

```json
[
  "https://www.tiktok.com/@fallous_oakparkmichigan/video/1234567890123456789",
  "https://www.tiktok.com/@fallous_oakparkmichigan/video/9876543210987654321"
]
```

4. Commit. Netlify redeploys, and the video shows up live on the site as a
   real playable TikTok embed.

## Removing a video

Delete its link from the array and commit.

## Order

Videos display in the order they appear in the list.
