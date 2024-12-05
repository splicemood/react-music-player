# React Music Player

## Features

This music player comes with the following features:

- Full tab synchronization
- Play/Pause tab synchronization
- No sync

## Web browsers compatibility (Can I Use >96%)

- [BroadcastChannel](https://caniuse.com/broadcastchannel)
- [Window API: storage event](https://caniuse.com/mdn-api_window_storage_event)

## npm scripts

## Build and dev scripts

- `dev` – start development server
- `build` – build production version of the app
- `preview` – locally preview production build

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier
- `vitest` – runs vitest tests
- `vitest:watch` – starts vitest watch
- `test` – runs `vitest`, `prettier:check`, `lint` and `typecheck` scripts

### Other scripts

- `storybook` – starts storybook dev server
- `storybook:build` – build production storybook bundle to `storybook-static`
- `prettier:write` – formats all files with Prettier
