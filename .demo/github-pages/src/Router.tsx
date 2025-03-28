import { lazy } from 'react';
import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { NothingFoundBackground } from '@/components/NothingFoundBackground/NothingFoundBackground';
import Suspense from '@/hoc/Suspense';

const LazyFullSync = lazy(() => import('@/pages/FullSync.chunk'));
const LazyPlayPause = lazy(() => import('@/pages/PlayPause.chunk'));
const LazyNoSync = lazy(() => import('@/pages/NoSync.chunk'));

const routes = createRoutesFromElements(
  <Route>
    <Route
      index
      element={
        <Suspense>
          <LazyFullSync />
        </Suspense>
      }
    />
    <Route
      path={'playpause'}
      element={
        <Suspense>
          <LazyPlayPause />
        </Suspense>
      }
    />
    <Route
      path={'nosync'}
      element={
        <Suspense>
          <LazyNoSync />
        </Suspense>
      }
    />
    <Route path={'*'} element={<NothingFoundBackground />} />
  </Route>
);

const router = createHashRouter(routes);

export function Router() {
  return <RouterProvider router={router} />;
}
