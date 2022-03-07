import { configureStore } from '@reduxjs/toolkit';
import repoReducer from './slices/repo/repo.slice';
import filterReducer from './slices/filter/filter.slice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';

// STEP 1: CREATE SAGA MIDDLEWARE
const sagaMiddleware = createSagaMiddleware();

// STEP 2: CREATE STORE AND ADD SAGA MIDDLEWARE
export const store = configureStore({
    reducer: {
        repo: repoReducer,
        filter: filterReducer
    },
    middleware: [sagaMiddleware]
})

// STEP 3: INITIATE SAGA MIDDLEWARE
sagaMiddleware.run(rootSaga);