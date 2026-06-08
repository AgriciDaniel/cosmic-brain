# Slidev decks

Each subfolder here (except `_shared/`) is a self-contained
[Slidev](https://sli.dev) deck. Decks build with `--base ./` so the
output is portable: it works under the VitePress docs site at
`/slides/<deck>/` *and* hosts standalone from any path you drop it at.

## Layout

```
slides/
  _shared/
    vitepress-theme.css      # shared styling that mimics the VitePress dark theme
  fusion-intro/
    slides.md                # deck source
    style.css                # imports _shared/vitepress-theme.css
    svg/                     # deck-local SVG assets (referenced as ./svg/...)
    public/                  # deck-local public assets (favicon etc.)
    package.json             # @slidev/cli + dev/build scripts
    Run-Slides.cmd           # convenience launcher (Windows)
```

Place asset folders (`svg/`, `img/`, …) directly inside the deck and
reference them with relative paths (`./svg/foo.svg`). Everything stays
inside the deck folder.

## Working on a deck

```
cd slides/fusion-intro
npm install                  # first time only
npm run dev                  # Slidev dev server on http://localhost:3040
```

## Building decks into the docs site

From the `docs/` folder:

```
npm run slides:build         # builds every deck into docs/public/slides/
npm run docs:build           # also runs slides:build first
```

After `slides:build` the deck is served at
`http://localhost:3030/slides/<deck>/` by the VitePress dev server
(`Run-Docs.cmd`) and at the corresponding path on the published site.

## Creating a new deck

1. Copy `fusion-intro/` to `<deck>/` and edit `slides.md`.
2. In the new `package.json`, update `name`, the `--out` path in the
   `build` script (`../../public/slides/<deck>`), and pick an unused
   dev port.
3. Run `npm install` in the new deck folder.
4. From `docs/`, run `npm run slides:build` to publish it.
