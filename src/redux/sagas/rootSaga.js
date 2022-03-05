import { takeEvery } from "redux-saga/effects";
import { sagaAddReposData, sagaGetReposData } from "./repo/repoSaga";
import sagaActions from "./repo/repoSaga.action";

function* rootSaga(){
    yield takeEvery(sagaActions.FETCH_REPO_SAGA, sagaGetReposData);
    yield takeEvery(sagaActions.ADD_REPOS_SAGA, sagaAddReposData);
}

export default rootSaga;