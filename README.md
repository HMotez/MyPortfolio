# Hamzaoui Moetez — Portfolio

Personal portfolio website built with React, Vite, Three.js and Tailwind CSS.

**[🌐 Live → portfolio-hmotez.onrender.com](https://portfolio-hmotez.onrender.com)**  
<sub>Free hosting: the contact form's API can take about 50 seconds to wake up after a quiet period.</sub>

## Screenshots

![Hero](screenshots/hero.png)

![About](screenshots/about.png)

## Tech Stack

- **Frontend:** React.js, Tailwind CSS, Three.js / React Three Fiber, Framer Motion, Lenis
- **Build:** Vite
- **Backend:** Node.js, Express.js (contact form — Gmail SMTP locally, Resend in production)
- **Delivery:** Docker Compose (nginx serving the build + API), Render Blueprint

## Features

- Interactive 3D desktop PC in the hero, with floating glass tech badges and glossy 3D blobs
- Holographic 3D portrait card: pointer tilt, parallax layers, orbiting tech logos, flips to an illustrated avatar
- Motion design: preloader, smooth scroll, kinetic headings, velocity marquee, scroll-drawn timeline, horizontal projects showcase
- Animated HM logo, custom cursor, spotlight-border cards
- **EN / FR** language switch and **dark / light** themes (circular reveal transition)
- Downloadable CV (EN / FR)
- Contact form with email delivery

## Getting Started

```bash
npm install
cp .env.example .env    # set GMAIL_USER and GMAIL_APP_PASSWORD
npm run dev             # website on http://localhost:5173 + contact API on :5000
```

### Run with Docker

```bash
cp .env.example .env    # set GMAIL_USER and GMAIL_APP_PASSWORD
docker compose up --build
```

Open <http://localhost:3000>. nginx serves the website and forwards `/api` to the API container.

| Path | Purpose |
|---|---|
| `docker/Dockerfile.frontend` | Vite build → nginx |
| `docker/Dockerfile.backend` | Express contact API (only its own 4 dependencies) |
| `docker/nginx.conf` | SPA routing, caching, `/api` proxy |
| `docker-compose.yml` | Runs both locally |
| `render.yaml` | Render Blueprint (free static site + Docker API) |

## Deployment

Deployed on Render (free) with a Blueprint — see **[DEPLOY.md](DEPLOY.md)** for the step-by-step guide.

## Contact

- Email: hamzaouii.moetez@gmail.com
- LinkedIn: [linkedin.com/in/hamzaoui-moetez](https://linkedin.com/in/hamzaoui-moetez)
- GitHub: [github.com/HMotez](https://github.com/HMotez)
