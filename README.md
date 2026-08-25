# Kaarigar — Merged App (Option A)

This is the single, combined app — both the User side and Technician side, chosen at
launch via the role-picker screen ("For User" / "For Kaarigar Technician").

## What changed from the two separate apps
- Splash screen (5s) → role picker (first launch only) → your chosen side
- Once you pick a role, it's remembered on that device — the picker won't show again
  next time you open the app; it goes straight to your side
- A small **"SWITCH ROLE"** button in the top-right of each screen's header lets you
  go back to the picker anytime (this reloads the page, by design — keeps both sides
  completely independent under the hood, so nothing from one side can ever interfere
  with the other)
- **Nothing about the actual logic changed** — GPS, Firestore, the 2km filter, the
  19 trades, the free trial + UPI paywall, all of it works exactly as it did before.
  This merge only changed how you get to each screen.

## This is a NEW, separate GitHub repo
Your existing Technician and User repos are untouched and still live at their old
URLs — this is intentional, so you have a safe fallback. Don't delete those yet.

## Upload steps
1. Create a new GitHub repository (e.g. `kaarigar-app` or `kaarigar`)
2. Make sure it's **Public**
3. Upload all 6 files from this package to the repo root:
   - `index.html`
   - `manifest.json`
   - `service-worker.js`
   - `icon-192.png`
   - `icon-512.png`
   - `splash.jpg`
4. Repo → **Settings → Pages** → Source: **Deploy from a branch** → branch **main** →
   folder **/ (root)** → Save
5. Wait ~1–2 minutes, then open the live URL in a fresh Incognito tab

## Testing checklist
- [ ] Splash shows for 5 seconds, then the role picker appears
- [ ] "For User" → takes you to the exact same User experience as before
- [ ] "For Kaarigar Technician" → takes you to the exact same Technician experience
- [ ] Close the tab, reopen the URL → should skip the picker and go straight to
      whichever role you picked last
- [ ] "SWITCH ROLE" button → returns to the picker

## Before this goes on the Play Store
The Technician `.apk`/`.aab` you already generated through PWABuilder pointed at
the OLD Technician-only URL. Once you're confident this merged app is working well,
you'll need to **run it through PWABuilder again** using this new merged app's URL —
same signing key, just repackaged. Full guidance on that step is in earlier project
notes; ask if you want a refresher when you're ready for it.
