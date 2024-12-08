import { PlayerFullSyncProvider } from '@splicemood/react-music-player';
import HomePage from '@/pages/FullSync.page';

const FullSync = () => {
  return (
    <PlayerFullSyncProvider>
      <HomePage />
    </PlayerFullSyncProvider>
  );
};

export default FullSync;
