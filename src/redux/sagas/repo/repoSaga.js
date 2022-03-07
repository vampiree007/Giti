import { call, put } from "redux-saga/effects";
import axioz from "../../../configs/axios.config";
import { setRepoData, addRepoData } from "../../slices/repo/repo.slice";


// UTILITY GET DATE FROM TIMESTAMP
const getDate = (timestamp) => {
    let date = new Date(timestamp);
    date = date.toISOString().slice(0, 10);
    return date
}

// API CALL FUNCTION
const callAPI = async ({ url, method, data }) => {
    return await axioz({
      url,
      method,
      data
    });
};

// GENERATOR 1: ADD PAGES TO REPOS ON SCROLL AND PAGE INCREMENT
export function* sagaAddReposData({payload}){
    const date = getDate(payload.date)
    try{
        let {data} = yield call(() => callAPI({
            url: `/repositories?q=created:>${date}&sort=stars&order=desc&per_page=10&page=${payload.page}`
        }))
        yield put(addRepoData(data.items))
    }catch(err){
        console.log(err)
    }
}

// GENERATOR 2: FETCHES DATA ON INITIAL LOAD AND DATE CHANGE
export function* sagaGetReposData({payload}){
    const date = getDate(payload.date)
    try{
        let {data} = yield call(() => callAPI({
            url: `/repositories?q=created:>${date}&sort=stars&order=desc&per_page=10&page=1`
        }))
        yield put(setRepoData(data))
    }catch(err){
        console.log(err)
    }
}