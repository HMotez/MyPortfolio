# Deploying for free (Render + Resend)

The portfolio runs on free plans, with HTTPS included:

| Part | Service | Free plan |
|---|---|---|
| Website (React + Vite build) | Render static site | Always on |
| Contact API (Express) | Render web service (Docker) | Sleeps after 15 min without visits; the next request wakes it in about 50 s |
| Email delivery | Resend | 100 emails/day, 3,000/month |

Your site will be at `https://portfolio-hmotez.onrender.com` and the API at
`https://portfolio-api-hmotez.onrender.com` (names set in [`render.yaml`](render.yaml)).

> **Why Resend and not Gmail?** Since September 2025, Render's free web services block outbound
> SMTP (ports 25, 465 and 587), so Gmail's SMTP server can't be reached from there. The API
> therefore sends through Resend's HTTP API when `RESEND_API_KEY` is set, and falls back to
> Gmail SMTP otherwise (local development and Docker).

---

## 1. Get an email API key (Resend), about 3 minutes

1. Go to <https://resend.com> and sign up — **use the inbox where you want to receive messages**
   (e.g. `hamzaouii.moetez@gmail.com`). Until you verify a domain of your own, Resend only
   delivers to that address, which is exactly what a contact form needs.
2. Open **API Keys → Create API Key**, permission *Sending access*. Copy the key (`re_…`);
   it is shown only once. Keep it for step 2.

## 2. Create the API and the website (Render), about 10 minutes

1. Go to <https://render.com> and sign up with GitHub. Allow access to the `MyPortfolio` repository.
2. Click **New → Blueprint**, choose the repository, then **Connect**. Render reads `render.yaml`.
3. Fill in the values it asks for:

   | Variable | What to enter |
   |---|---|
   | `RESEND_API_KEY` | the key from step 1 |
   | `CONTACT_TO` | the email you signed up to Resend with |

4. Click **Apply**. The first build takes 3–5 minutes.
5. Open `https://portfolio-hmotez.onrender.com`.

### If Render gives a different address

Service names are unique across Render. If a name was taken, Render adds a suffix
(e.g. `portfolio-api-hmotez-x1y2.onrender.com`). Then:

- on the **website** service → *Environment*: set `VITE_API_URL` to the real API address, then *Manual Deploy*
  (Vite bakes it into the build);
- on the **API** service → *Environment*: set `ALLOWED_ORIGINS` to `["https://<real website address>"]`.

## 3. Check

- `https://portfolio-api-hmotez.onrender.com/api/health` answers
  `{"status":"ok","mailer":"resend","configured":true}`.
- The website loads, the 3D scene appears, and EN/FR and dark/light switch.
- Send yourself a message from the contact form (the first one after a quiet period can take
  ~50 s while the API wakes up).

## Updating

Every push to `main` redeploys automatically, as long as Render's GitHub app can see the
repository (install it at <https://github.com/apps/render/installations/new> → *Only select
repositories* → `MyPortfolio`). The API only rebuilds when `server/` changes, the website
only when the front-end changes. Without the app, use *Manual Deploy* on each service.

## Good to know

- **Cold starts.** To avoid the 50-second wake-up of the contact API, ping
  `https://portfolio-api-hmotez.onrender.com/api/health` every 10 minutes with a free monitor
  such as <https://cron-job.org> or UptimeRobot. The website itself never sleeps.
- **Spam.** The API accepts at most 5 messages per visitor every 15 minutes and escapes all
  input before putting it in the email.
- **Own domain.** Later you can add a domain (about 10 €/year) in Render → *Settings → Custom
  Domains*; HTTPS stays free. Verify the same domain on Resend to send from
  `contact@your-domain` (set `RESEND_FROM`) and to any address.

## Alternative: one server with Docker

On any Linux server (or your own computer) with Docker:

```bash
cp .env.example .env      # set GMAIL_USER and GMAIL_APP_PASSWORD (or RESEND_API_KEY)
docker compose up --build -d
```

Open <http://localhost:3000>. nginx serves the website and forwards `/api` to the API container,
so no `VITE_API_URL` is needed.
