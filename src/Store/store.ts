import {combineReducers, configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'
import {takeEvery, race,takeLatest,throttle} from 'redux-saga/effects'
import {getPostsTakeEvery, postsReducer} from "./posts";

const rootReducer = combineReducers({postsReducer})
const sagaMiddle = createSagaMiddleware()

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(sagaMiddle)
})

function* postsWatcher() {
    yield  throttle(2000,'ACTION-GET-POSTS', getPostsTakeEvery)
}

function* commonWatcher() {
    yield race([postsWatcher()])
}

sagaMiddle.run(commonWatcher)