import { PlayerPlayPauseSyncProvider } from '@splicemood/react-music-player';
import PlayPausePage from '@/pages/PlayPause.page';

const PlayPauseSync = () => {
  return (
    <PlayerPlayPauseSyncProvider>
      <PlayPausePage />
    </PlayerPlayPauseSyncProvider>
  );
};

export default PlayPauseSync;
