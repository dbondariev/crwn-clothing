import { createSelector } from "reselect";

// creating a memoized (CASHED) version of selectCategories (This is what will run if nothing changed)
const selectCategoryReducer = (state) => state.categories;

// creating dependencies for the chashed values
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

// as long as "selectCategories" doesn't change, Don't run this function
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      // acc is for 'accumulator'
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);

export const selectcategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
