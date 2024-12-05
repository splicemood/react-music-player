import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { NothingFoundBackground } from '@/components/NothingFoundBackground/NothingFoundBackground';
import NoSyncPage from '@/pages/NoSync.page';
import PlayPausePage from '@/pages/PlayPause.page';
import { PlayerFullSyncProvider } from '@/providers/PlayerFullSyncProvider';
import { PlayerNoSyncProvider } from '@/providers/PlayerNoSyncProvider';
import { PlayerPlayPauseSyncProvider } from '@/providers/PlayerPlayPauseSyncProvider';
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
