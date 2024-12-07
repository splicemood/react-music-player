import { maxPercentage } from '@splicemood/react-music-player';

export const repository = 'https://github.com/splicemood/react-music-player';
export const registry = 'https://www.npmjs.com/package/@splicemood/react-music-player';
export const minTime = 0;
export const minVolume = 0;
export const maxVolume = maxPercentage;
export const volumeStep = 5;
export const timeStep = 5;

export const codeFullSync = `import ReactDOM from 'react-dom/client';
import App from './App';
import { PlayerFullSyncProvider } from '@splicemood/react-music-player';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <PlayerFullSyncProvider>
    <App />
  </PlayerFullSyncProvider>
);`;

export const codePlayPauseSync = `import ReactDOM from 'react-dom/client';
import App from './App';
import { PlayerFullSyncProvider } from '@splicemood/react-music-player'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <PlayerPlayPauseSyncProvider>
    <App />
  </PlayerPlayPauseSyncProvider>
);`;

export const codeNoSync = `import ReactDOM from 'react-dom/client';
import App from './App';
import { PlayerFullSyncProvider } from '@splicemood/react-music-player'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <PlayerNoSyncProvider>
    <App />
  </PlayerNoSyncProvider>
);`;

export const codeHookUsage = `import { useAudio } from '@splicemood/react-music-player';

const App = () => {
  const audio = useAudio();

  useEffect(() => {
    audio.addToPlaylist({ src: '/react-music-player/music/music1.mp3' });
  }, []);

  return (
    <div>
      <button onClick={audio.togglePlayPause}>▶</button>
      <input
        type="range"
        name="time"
        id="player-time"
        max={audio.maxTime}
        value={audio.currentTime}
        onChange={(ev) => {
          const newTime = ev.currentTarget.value;
          audio.setUpdateTime(Number(newTime));
        }}
      />
    </div>
  );
};

export default App;`;
