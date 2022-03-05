import { configureStore } from '@reduxjs/toolkit';
import repoReducer from './slices/repo/repo.slice';
import filterReducer from './slices/filter/filter.slice';
import createSagaMiddleware from 'redux-saga';

export const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
    reducer: {
        repo: repoReducer,
        filter: filterReducer
    },
    middleware: [sagaMiddleware]
})