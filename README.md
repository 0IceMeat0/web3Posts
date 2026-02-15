# web3Posts

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Stack

- **Next.js 16** (App Router), **React 19**
- **TypeScript**
- **Redux Toolkit** + RTK Query (JSONPlaceholder API)
- **SASS** (modules)

---

## Structure (`src/`)

| Folder      | Description                                           |
|-------------|-------------------------------------------------------|
| `app/`      | Routes and layouts (Next.js App Router)               |
| `entities/` | Business entities: post, comment, photo (API, UI)     |
| `features/` | Features: auth, post-crud                             |
| `widgets/`  | Widgets: sidebar, post-list, photo-gallery            |
| `shared/`   | Shared: UI components, styles, API, hooks, utilities  |

Architecture: [Feature-Sliced Design](https://feature-sliced.design/).
