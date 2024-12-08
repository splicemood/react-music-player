import { PlayerNoSyncProvider } from '@splicemood/react-music-player';
import NoSyncPage from '@/pages/NoSync.page';

const NoSyncChunk = () => {
  return (
    <PlayerNoSyncProvider>
      <NoSyncPage />
    </PlayerNoSyncProvider>
  );
};

export default NoSyncChunk;
