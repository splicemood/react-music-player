import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { NothingFoundBackground } from '@/components/NothingFoundBackground/NothingFoundBackground';
import { PlayerFullSyncProvider } from '@/package/PlayerFullSyncProvider';
import { PlayerNoSyncProvider } from '@/package/PlayerNoSyncProvider';
import { PlayerPlayPauseSyncProvider } from '@/package/PlayerPlayPauseSyncProvider';
import NoSyncPage from '@/pages/NoSync.page';
import PlayPausePage from '@/pages/PlayPause.page';
import HomePage from './pages/FullSync.page';

const routes = createRoutesFromElements(
  <Route>
    <Route
      index
      element={
        <PlayerFullSyncProvider>
          <HomePage />
        </PlayerFullSyncProvider>
      }
    />
    <Route
      path={'playpause'}
      element={
        <PlayerPlayPauseSyncProvider>
          <PlayPausePage />
        </PlayerPlayPauseSyncProvider>
      }
    />
    <Route
      path={'nosync'}
      element={
        <PlayerNoSyncProvider>
          <NoSyncPage />
        </PlayerNoSyncProvider>
      }
    />
    <Route path={'*'} element={<NothingFoundBackground />} />
  </Route>
);

const router = createHashRouter(routes);

export function Router() {
  return <RouterProvider router={router} />;
}
