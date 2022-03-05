import { call, put } from "redux-saga/effects";
import axioz from "../../../configs/axios.config";
import { setRepoData, addRepoData } from "../../slices/repo/repo.slice";

const getDate = (timestamp) => {
    let date = new Date(timestamp);
    date = date.toISOString().slice(0, 10);
    return date
}

const callAPI = async ({ url, method, data }) => {
    return await axioz({
      url,
      method,
      data
    });
};

export function* sagaAddReposData({payload}){
    const date = getDate(payload.date)
    try{
        let {data} = yield call(() => callAPI({
            url: `/repositories?q=created:>${date}&sort=stars&order=desc&per_page=20&page=${payload.page}`
        }))
        yield put(addRepoData(data.items))
    }catch(err){
        console.log(err)
    }
}

export function* sagaGetReposData({payload}){
    const date = getDate(payload.date)
    try{
        let {data} = yield call(() => callAPI({
            url: `/repositories?q=created:>${date}&sort=stars&order=desc&per_page=20&page=1`
        }))
        yield put(setRepoData(data))
    }catch(err){
        console.log(err)
    }
}