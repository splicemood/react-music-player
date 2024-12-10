<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![NPM Downloads][npm-shield]][npm-url]
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/splicemood/react-music-player">
    <img src="https://avatars.githubusercontent.com/u/190438716" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">React Music Player</h3>

  <p align="center">
    The music player that sync all settings between multiple tabs on a single client-side browser session
    <br />
    <a href="https://github.com/splicemood/react-music-player"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://splicemood.github.io/react-music-player">View Demo</a>
    ·
    <a href="https://github.com/splicemood/react-music-player/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/splicemood/react-music-player/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![React Music Player Video Demo][product-video-demo]](https://splicemood.github.io/react-music-player/)

### Web browsers compatibility (Can I Use >96%)

- [BroadcastChannel](https://caniuse.com/broadcastchannel)
- [Window API: storage event](https://caniuse.com/mdn-api_window_storage_event)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![React][React.js]][React-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

You need to setup provider and hook in your react app

### Prerequisites

Install dependency

* npm
  ```sh
  npm i @splicemood/react-music-player
  ```

* bun
  ```sh
  bun i @splicemood/react-music-player
  ```

### Installation

main.tsx

```tsx
import ReactDOM from 'react-dom/client';
import App from './App';
import { PlayerFullSyncProvider } from '@splicemood/react-music-player';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <PlayerFullSyncProvider>
    <App />
  </PlayerFullSyncProvider>
);
```

Player.tsx

```tsx
import { useAudio } from "@splicemood/react-music-player"

const Player = () => {
  const audio = useAudio()
  
  // your component visualization using the hook
};

export default Player;
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

_For more examples, please refer to the [GitHub Page of the project](https://splicemood.github.io/react-music-player/)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Full tab synchronization provider
- [x] Play/Pause tab synchronization provider
- [x] No sync provider

See the [open issues](https://github.com/splicemood/react-music-player/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Top contributors:

<a href="https://github.com/splicemood/react-music-player/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=splicemood/react-music-player" alt="contrib.rocks image" />
</a>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Kirill Bogomolov - [@manazoid](https://t.me/manazoid) - uralkir@gmail.com

Project Link: [https://github.com/splicemood/react-music-player](https://github.com/splicemood/react-music-player)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [SharpNesla](https://github.com/sharpnesla)
* [Borobysh](https://github.com/Boroboysh)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/splicemood/react-music-player.svg?style=for-the-badge
[contributors-url]: https://github.com/splicemood/react-music-player/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/splicemood/react-music-player.svg?style=for-the-badge
[forks-url]: https://github.com/splicemood/react-music-player/network/members
[stars-shield]: https://img.shields.io/github/stars/splicemood/react-music-player.svg?style=for-the-badge
[stars-url]: https://github.com/splicemood/react-music-player/stargazers
[issues-shield]: https://img.shields.io/github/issues/splicemood/react-music-player.svg?style=for-the-badge
[issues-url]: https://github.com/splicemood/react-music-player/issues
[license-shield]: https://img.shields.io/github/license/splicemood/react-music-player.svg?style=for-the-badge
[license-url]: https://github.com/splicemood/react-music-player/blob/main/LICENSE
[npm-shield]: https://img.shields.io/npm/dm/%40splicemood%2Freact-music-player?style=for-the-badge
[npm-url]: https://www.npmjs.com/package/@splicemood/react-music-player
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[product-video-demo]: .demo/product.gif
