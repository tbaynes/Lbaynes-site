# Deployment Guide — lesliebaynes.com

This is the complete end-to-end process to take this project from zip file to live site at `https://lesliebaynes.com`.

Estimated total time: **90–120 minutes of active work**, spread across sessions while waiting on DNS propagation and the GoDaddy → Cloudflare transfer.

---

## Before you start — confirm prerequisites

- ✅ Domain transfer from GoDaddy → Cloudflare initiated (or complete)
- ✅ GitHub account at `lesliebaynesphd`
- ✅ GitHub repo `lbaynes-site` created, public, with a README
- ✅ Netlify account (signed in via GitHub)
- ✅ Node.js 20+ installed locally (`node --version` should say v20 or higher)
- ✅ Git installed (`git --version`)
- ✅ ImprovMX account ready (setup happens after transfer completes)

---

## Step 1 — Extract and verify locally (~10 min)

### 1.1 Unzip the project

Drop `lbaynes-site.zip` somewhere sensible — e.g. `~/Sites/lbaynes-site/` on your Mac.

```bash
cd ~/Sites
unzip lbaynes-site.zip
cd lbaynes-site
```

### 1.2 Install dependencies

```bash
npm install
```

This pulls in Astro and the sitemap integration. Takes 30–60 seconds.

### 1.3 Run the dev server locally

```bash
npm run dev
```

Astro will start at `http://localhost:4321`. Open that URL in a browser. You should see:

- Home page with Leslie's portrait and the book feature
- Book page with all endorsements
- About, Media & Speaking, Writing, and Contact pages rendering

If anything's broken, stop here and ping me — don't push broken code to main.

**Ctrl+C to stop the dev server when you're satisfied.**

---

## Step 2 — Push to GitHub (~10 min)

### 2.1 Initialize Git

From inside the `lbaynes-site` directory:

```bash
git init
git add .
git commit -m "Initial commit — complete site scaffold"
```

### 2.2 Add the remote and push

```bash
git branch -M main
git remote add origin https://github.com/lesliebaynesphd/lbaynes-site.git
git push -u origin main
```

If this is a new machine, GitHub may prompt for authentication. Use a personal access token (not your password) — generate one at github.com/settings/tokens with `repo` scope.

### 2.3 Verify on GitHub

Go to `https://github.com/lesliebaynesphd/lbaynes-site` in your browser. You should see all files.

---

## Step 3 — Connect Netlify (~10 min)

### 3.1 Create the site

1. Go to `app.netlify.com`
2. Click **"Add new site" → "Import an existing project"**
3. Choose **"GitHub"** as the Git provider
4. Authorize Netlify to access your repos (one-time)
5. Select `lesliebaynesphd/lbaynes-site`

### 3.2 Configure build settings

Netlify will auto-detect Astro. Confirm:

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Branch to deploy:** `main`

Click **"Deploy site"**.

### 3.3 Wait for first build

First build takes 2–3 minutes. Netlify will show logs in real time. When done, you'll see a temporary URL like `https://stellar-otter-abc123.netlify.app`.

**Open that URL. Confirm the site renders.**

### 3.4 Rename the site (optional but recommended)

In Netlify's site settings, change the Netlify subdomain from the randomly-generated name to something cleaner, e.g. `lesliebaynes.netlify.app`. Makes the temp URL prettier for sharing preview links.

---

## Step 4 — Wait for domain transfer (3–7 days)

During the GoDaddy → Cloudflare transfer, you can do nothing further with DNS. Come back to this guide once the transfer email from Cloudflare arrives.

**Use this time to:**
- Let Leslie review the temporary Netlify URL
- Gather her copy edits
- Locate remaining assets (video clips, Kilns photos)
- Build the press kit PDF

---

## Step 5 — Point domain at Netlify (~20 min, after transfer completes)

### 5.1 Add custom domain in Netlify

1. Netlify dashboard → your site → **Domain management**
2. Click **"Add a domain"**, enter `lesliebaynes.com`
3. Netlify will say "verify ownership." Click verify.

### 5.2 Configure DNS at Cloudflare

Netlify will show you required DNS records. You have two options:

**Option A — Let Netlify manage DNS (simpler, recommended):**
1. In Netlify, choose "Set up Netlify DNS"
2. Netlify gives you 4 nameservers like `dns1.p01.nsone.net`
3. In Cloudflare dashboard → `lesliebaynes.com` → **DNS** → change nameservers to the Netlify ones
4. Wait 15–60 min for propagation
5. Done.

**Option B — Keep Cloudflare DNS, point records at Netlify:**
1. In Cloudflare DNS, add:
   - `A` record: name `@`, value `75.2.60.5` (Netlify's load balancer IP, verify current value in Netlify instructions)
   - `CNAME` record: name `www`, value `lesliebaynes.netlify.app`
2. Both records should have proxy OFF (gray cloud) so SSL works correctly
3. In Netlify domain settings, set `lesliebaynes.com` as primary domain

**Recommendation: Option A.** Simpler, fewer failure points. You lose Cloudflare's CDN but Netlify has its own CDN so it doesn't matter.

### 5.3 Enable HTTPS

Netlify auto-provisions a Let's Encrypt certificate once DNS resolves. This takes 10–30 minutes after DNS propagation. Refresh the domain settings page until "HTTPS: Enabled" shows.

**Test:** open `https://lesliebaynes.com` in a fresh browser tab. Site should load with a lock icon.

---

## Step 6 — Set up ImprovMX email forwarding (~10 min)

Once domain is on Cloudflare:

### 6.1 Verify domain at ImprovMX

1. Log into ImprovMX
2. Add `lesliebaynes.com`
3. ImprovMX gives you MX records to add

### 6.2 Add MX records at Cloudflare (NOT Netlify DNS)

Wait — this depends on which DNS option you chose in Step 5.2.

**If you chose Option A (Netlify DNS):** you need to add the MX records in Netlify's DNS settings (`app.netlify.com → your site → Domain management → Netlify DNS → DNS records`). This is a common gotcha.

**If you chose Option B (Cloudflare DNS):** add them in Cloudflare's DNS panel.

The records are:
- `MX` record, name `@`, value `mx1.improvmx.com`, priority 10
- `MX` record, name `@`, value `mx2.improvmx.com`, priority 20

Also add an SPF record so emails don't get marked as spam:
- `TXT` record, name `@`, value `v=spf1 include:spf.improvmx.com ~all`

### 6.3 Set up forwarding addresses

In ImprovMX dashboard for `lesliebaynes.com`, add aliases:
- `media@lesliebaynes.com` → Leslie's Gmail
- `speaking@lesliebaynes.com` → Leslie's Gmail
- `hello@lesliebaynes.com` → Leslie's Gmail
- `*@lesliebaynes.com` → Leslie's Gmail (catch-all, optional but recommended)

### 6.4 Test

Send a test email from your personal account to `media@lesliebaynes.com`. Confirm it arrives in Leslie's Gmail within 1–2 minutes.

---

## Step 7 — Enable Decap CMS for Leslie (~15 min)

### 7.1 Enable Netlify Identity

1. Netlify dashboard → your site → **Integrations** (or **Site settings → Identity** in older UI)
2. Click **"Enable Identity"**
3. Under "Registration," choose **"Invite only"** — prevents random signups
4. Under "External providers," leave everything off (not needed)

### 7.2 Enable Git Gateway

Still in the Identity section:

1. Scroll to **Services → Git Gateway**
2. Click **"Enable Git Gateway"**

This lets Decap CMS write commits to your repo on Leslie's behalf without giving her GitHub access directly.

### 7.3 Invite Leslie

1. Netlify Identity → **"Invite users"**
2. Enter Leslie's email address
3. She receives an email titled "You've been invited to join [site]"
4. She clicks the link, sets a password
5. Browser redirects to `https://lesliebaynes.com/admin/` (or wherever the invite link points)
6. She logs in and sees the Decap CMS interface

### 7.4 Train Leslie on editing

Give Leslie this quick orientation:

> To edit the site:
> 1. Go to `https://lesliebaynes.com/admin`
> 2. Log in with your email and password
> 3. Choose a collection (Podcast Appearances, Book Endorsements, or Writing)
> 4. Click the entry to edit, or **"New"** to add one
> 5. Fill in the fields. For podcast appearances, "Date" and "Title" are required; everything else is optional
> 6. Click **"Publish"**. Site rebuilds in about 60 seconds. Changes go live automatically.
>
> To upload a new photo: click the image field, choose "Upload new file." Images go into `/images/uploads/`.

---

## Step 8 — Install analytics (~10 min, optional but recommended)

### 8.1 Cloudflare Web Analytics

1. Go to `dash.cloudflare.com` → Analytics → Web Analytics
2. Click **"Add a site"**, enter `lesliebaynes.com`
3. Copy the beacon token Cloudflare gives you (a long hex string)
4. In your local project, edit `src/layouts/Base.astro`
5. Uncomment the Cloudflare Analytics script block
6. Replace `YOUR_TOKEN_HERE` with the actual token
7. Commit and push:

```bash
git add src/layouts/Base.astro
git commit -m "Enable Cloudflare Web Analytics"
git push
```

Netlify auto-deploys within 60 seconds.

### 8.2 Microsoft Clarity

1. Go to `clarity.microsoft.com`, sign in (Microsoft account required)
2. Click **"New project"**, enter site details
3. Clarity gives you a project ID (10-character string)
4. In `src/layouts/Base.astro`, uncomment the Clarity script block
5. Replace `YOUR_PROJECT_ID_HERE` with the actual ID
6. Commit and push

Analytics start recording within minutes. Clarity shows heatmaps after ~50 pageviews.

---

## Step 9 — Launch checklist (~30 min)

Before you announce the site publicly, walk through this list:

### Content & links
- [ ] All copy on Home, Book, About, Media, Writing, Contact pages is correct
- [ ] All 9 endorsements display properly on /book
- [ ] All purchase buttons (Bookshop, Eerdmans, Amazon, Barnes & Noble) have real URLs — currently they all say `href="#"`, you need to replace with actual purchase links
- [ ] Book cover and headshot look good on iPhone, iPad, and desktop
- [ ] Mobile nav is usable
- [ ] All podcast URLs work when clicked
- [ ] CV download link works (upload `cv-leslie-baynes.pdf` to `/public/`)
- [ ] Press kit download link works (upload `press-kit.pdf` to `/public/`)

### Technical
- [ ] `https://lesliebaynes.com` loads with HTTPS
- [ ] `https://www.lesliebaynes.com` redirects to non-www (or vice versa, pick one)
- [ ] Test email: send to `media@lesliebaynes.com`, verify delivery
- [ ] Decap CMS loads at `/admin`, Leslie can log in and edit
- [ ] Favicon shows in browser tab
- [ ] View page source on home page — confirm Open Graph tags are present (for Facebook/LinkedIn preview)

### Announcements
- [ ] Post to Leslie's X (@baynesleslie)
- [ ] Post to Leslie's LinkedIn
- [ ] Post to Leslie's Facebook
- [ ] Email Eerdmans so they can add the site link to her author page
- [ ] Email podcast hosts who featured her so they can link to it
- [ ] Update her MSU faculty page bio to include the URL

---

## Ongoing maintenance

**Leslie edits via Decap CMS** — she shouldn't need to touch Git or code.

**You handle:**
- Monthly-ish: check Netlify build logs for any deploys that failed
- Annually: renew domain at Cloudflare ($10/yr)
- Annually: update `npm` dependencies (`npm outdated`, `npm update`) — takes 10 min

**Cost summary:**
- Domain: ~$10/year at Cloudflare
- Netlify: $0 (free tier handles this traffic indefinitely)
- Email: $0 (ImprovMX free tier)
- Analytics: $0 (both Cloudflare and Clarity are free)
- **Total ongoing: ~$10/year**

---

## When things break

**Build fails on Netlify.** Check the build log. 90% of the time it's either (a) a syntax error in a markdown file, (b) a missing field in a content entry, or (c) `npm install` failing. Rollback by reverting the offending commit and pushing.

**DNS stops working.** Go to Cloudflare, check if nameservers are correct. If Leslie reports "site is down," first check `https://lesliebaynes.netlify.app` — if that works, it's a DNS issue, not a site issue.

**Decap CMS won't let Leslie in.** Confirm Netlify Identity is still enabled and Git Gateway is active. If she's locked out, re-invite her from Netlify Identity panel.

**Image upload fails.** Decap CMS saves to `/public/images/uploads/`. If those aren't showing, check `config.yml` paths match.

---

## Need help?

Paste any error messages into a new Claude chat with the context "continuing work on lesliebaynes.com site" and I'll debug.
