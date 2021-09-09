import memoize from 'lodash.memoize';

import { createSelector } from 'reselect';

const selectShop = state => state.shop;

const selectShopCollections = createSelector([selectShop], shop => shop.collections);

export const selectShopCollection = memoize(collectionUrlParam => createSelector([selectShopCollections], collections => collections[collectionUrlParam]));

export const selectCollectionsForPreview = createSelector([selectShopCollections], collections => Object.keys(collections).map(key => collections[key]));