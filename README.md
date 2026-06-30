# Fallou's African Hair Braiding — Website

## Files
- `fallous-braiding.html` — main site (includes the new chat widget)
- `admin.html` — password-protected admin dashboard (photos + settings)
- `netlify/functions/chat.js` — serverless function powering the chat agent
- `netlify.toml` — Netlify build/function config

## Deploying (GitHub + Netlify)

1. Push this folder to a new GitHub repo, e.g. `fallous-braiding-site`.
2. In Netlify: **Add new site → Import an existing project → GitHub** → pick the repo.
   - Build command: leave blank
   - Publish directory: `.`
   - Netlify will detect `netlify.toml` automatically and pick up the function.
3. **Set the API key** (required for the chat widget to work):
   - Netlify dashboard → Site settings → Environment variables
   - Add `ANTHROPIC_API_KEY` = your Anthropic API key
   - Redeploy after adding it (env vars only apply to new deploys)
4. Connect your domain:
   - Netlify → Domain settings → Add custom domain → `fallousafricanhairbraiding.com`
   - At Namecheap: switch nameservers to Netlify's, OR keep Namecheap BasicDNS and add the A/CNAME records Netlify gives you (Netlify shows the exact records once you add the domain)
   - SSL certificate is issued automatically once DNS resolves

## Chat agent

- Floating chat bubble, bottom-right corner of the site
- Answers FAQs (services, pricing, hours, location) from a fixed set of facts — it won't invent anything not listed in `chat.js`'s system prompt
- When someone wants to book, it collects name/phone/service/preferred time, then shows a **"Send this request by text"** button that opens the visitor's own messaging app with the details pre-filled — same trust model as the existing booking form, just conversational
- Does **not** check real calendar availability yet. To add real-time slot checking later, connect Google Calendar or Calendly and update `chat.js` accordingly — flag this to Claude when ready and it can wire it up

## Admin dashboard

- URL: yoursite.com/admin.html
- Default password: `fallous2024` (change it from Settings → Change admin password once live)
- Manages gallery photos and site settings (phone, hours, social links) via browser localStorage
- **Important limitation**: localStorage is per-browser/per-device. Photos uploaded from the salon's computer won't appear if someone visits admin.html from a different device. For multi-device editing, this needs to move to a real database — ask Claude to build that when ready.

## Known TODOs (carried over)
- Replace placeholder email (`hello@fallousafricanhairbraiding.com`) if a real one exists
- Add real gallery photos (reference photos available on the salon's Facebook page)
- Decide on Calendly/Google Calendar integration for real-time booking
- Admin localStorage → real database migration, if multi-device editing is needed
