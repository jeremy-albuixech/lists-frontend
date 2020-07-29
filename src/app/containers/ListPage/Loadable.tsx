/**
 * Asynchronously loads the component for ListPage
 */

import { lazyLoad } from 'utils/loadable';

export const ListPage = lazyLoad(
  () => import('./index'),
  module => module.ListPage,
);
