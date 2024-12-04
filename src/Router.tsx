import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { NothingFoundBackground } from '@/components/NothingFoundBackground/NothingFoundBackground';
import PlayPausePage from '@/pages/PlayPause.page';
import { PlayerFullSyncProvider } from '@/providers/PlayerFullSyncProvider';
import { PlayerNoSyncProvider } from '@/providers/PlayerNoSyncProvider';
import { PlayerPlayPauseSyncProvider } from '@/providers/PlayerPlayPauseSyncProvider';
import HomePage from './pages/FullSync.page';
import NoSyncPage from '@/pages/NoSync.page';

const routes = createRoutesFromElements(
  <Route>
    <Route path={'*'} element={<NothingFoundBackground />} />
    <Route
      path={'/'}
      element={
        <PlayerFullSyncProvider>
          <HomePage />
        </PlayerFullSyncProvider>
      }
    />
    <Route
      path={'/playpause'}
      element={
        <PlayerPlayPauseSyncProvider>
          <PlayPausePage />
        </PlayerPlayPauseSyncProvider>
      }
    />
    <Route
      path={'/nosync'}
      element={
        <PlayerNoSyncProvider>
          <NoSyncPage />
        </PlayerNoSyncProvider>
      }
    />
  </Route>
);

const router = createBrowserRouter(routes);

export function Router() {
  return <RouterProvider router={router} />;
}
