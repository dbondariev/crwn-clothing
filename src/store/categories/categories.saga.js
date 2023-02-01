import { takeLatest, all, call, put } from "redux-saga/effects"; // side-effects generators

import { getCategoriesAndDocuments } from "../../utils/firebase.utils";
import {
  fetchCategoriesFailure,
  fetchCategoriesSuccess,
} from "./categories.action";
import CATEGORIES_ACTION_TYPES from "./categories.types";

// -------------------THE SAGA ACTION------------------- //

// the function responsible for the async-action in the component
export function* fetchCategoriesAsync() {
  try {
    // instead of async-await --> use yield call()
    const categoriesArray = yield call(getCategoriesAndDocuments, "categories");

    // instead of dispatch() --> use yield put()
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailure(error));
  }
}

export function* onFetchCategories() {
  // takeLatest takes an action (if it repeats, take the last one)
  // it takes (the action-type to respond to + WHAT YOU WANT TO HAPPEN)
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

// main saga for this component that will go into the root-saga
export function* categoriesSaga() {
  yield all([call(onFetchCategories)]); // it's an effect that runs everything inside and only complete when "all" is done (it's like a pause)
}
