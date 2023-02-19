import { createSelector } from '@reduxjs/toolkit';

export const getPageSelector = createSelector(
  (state: any) => state,
  (pageSlices) => pageSlices.page,
);
