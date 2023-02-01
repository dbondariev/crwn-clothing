import { all, call } from "redux-saga/effects";
import { categoriesSaga } from "./categories/categories.saga";
import { userSagas } from "./user/user.saga";

// exporting generator-function
export function* rootSaga() {
  // populating rootSaga with the corresponding sagas
  yield all([call(categoriesSaga), call(userSagas)]);
}
