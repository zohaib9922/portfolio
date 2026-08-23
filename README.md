<div align="center">

# Zohaib Hassan — Portfolio

**A 3D, scroll-driven developer portfolio built with React, Three.js, and Framer Motion.**

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen?style=for-the-badge)](https://zohaib9922.github.io/portfolio)
[![License](https://img.shields.io/github/license/zohaib9922/-portfolio?style=for-the-badge)](LICENSE)
[![Stars](https://img.shields.io/github/stars/zohaib9922/-portfolio?style=for-the-badge)](https://github.com/zohaib9922/-portfolio/stargazers)

### 🔗 [zohaib9922.github.io/portfolio](https://zohaib9922.github.io/portfolio)

</div>

---

## ✨ Highlights

- **Interactive 3D Hero** — a scroll-choreographed Three.js scene (central core, orbiting tech ring, particle field, floating code panels) built with `react-three-fiber` and `drei`
- **Buttery smooth scrolling** — powered by [Lenis](https://github.com/darkroomengineering/lenis), synced to the 3D camera and scroll-linked animations
- **Polished micro-interactions** — Framer Motion transitions, magnetic buttons, tilt cards, and a cursor glow effect throughout
- **Light/dark theming** with a custom `ThemeContext`
- **Working contact form** via EmailJS, plus a one-click WhatsApp chat button
- **Fast & lean** — code-split routes, lazy-loaded sections, and a Vite production build

## 🛠 Tech Stack

| Category | Tools |
|---|---|
| Framework | React 19, TypeScript, Vite |
| 3D / Graphics | Three.js, `@react-three/fiber`, `@react-three/drei` |
| Animation | Framer Motion, GSAP, Lenis |
| Styling | Tailwind CSS |
| Contact | EmailJS |
| Deployment | GitHub Pages (`gh-pages`) |

## 🚀 Getting Started

\`\`\`bash
# clone the repo
git clone https://github.com/zohaib9922/-portfolio.git
cd -portfolio

# install dependencies
npm install

# start the dev server
npm run dev
\`\`\`

Open [http://localhost:5173](http://localhost:5173) to view it locally.

### Environment variables

The contact form uses [EmailJS](https://www.emailjs.com/). Copy `.env.example` to `.env` and fill in your own credentials:

\`\`\`bash
cp .env.example .env
\`\`\`

\`\`\`
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
\`\`\`

### Build & Deploy

\`\`\`bash
npm run build     # type-check + production build to /dist
npm run deploy     # build and publish to GitHub Pages
\`\`\`

## 📁 Project Structure

\`\`\`
src/
├── components/
│   ├── Hero/            # 3D scroll scene (objects/, scroll/) + hero UI
│   ├── About/
│   ├── Skills/
│   ├── Experience/
│   ├── Projects/        # project showcase with modal details
│   ├── Services/
│   ├── Contact/         # EmailJS form + WhatsApp CTA
│   ├── Footer/
│   └── ui/               # shared UI primitives (TiltCard, MagneticButton, ...)
├── context/              # ThemeContext
├── data/                 # project/content data
└── lib/                  # shared animation variants & helpers
\`\`\`

## 🤝 Contributing

Found a bug or have an idea to make this portfolio even better? Issues and PRs are welcome!

1. Fork the repo
2. Create your branch (`git checkout -b feature/amazing-idea`)
3. Commit your changes
4. Open a PR

## ⭐ Support

If you like this project, consider giving it a **star** — it helps the project reach more people and motivates further development!

## 📬 Contact

- **Email:** [hzuhaib57@gmail.com](mailto:hzuhaib57@gmail.com)
- **GitHub:** [@zohaib9922](https://github.com/zohaib9922)
- **LinkedIn:** [zohaibhasann](https://www.linkedin.com/in/zohaibhasann)

## 📄 License

This project is open source. Feel free to use it as inspiration for your own portfolio — a star or a credit link back is always appreciated! ⭐
