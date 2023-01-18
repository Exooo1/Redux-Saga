import {combineReducers, configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'
import {takeEvery, takeLatest, race, throttle, all, takeLeading, take} from 'redux-saga/effects'
import {allWorkers, getPostsTakeEvery, postsReducer,} from "./posts";
import {userReducer} from "./user";


// @ts-ignore
const rootReducer = combineReducers({postsReducer, userReducer})
const sagaMiddle = createSagaMiddleware()

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(sagaMiddle)
})

function* postsWatcher() {
    yield  throttle(2000, 'ACTION-GET-POSTS-THROTTLE', getPostsTakeEvery)
    // yield  takeEvery('ACTION-GET-POSTS-SIMPLE', getPostsTakeEvery)
    yield  takeLatest('ACTION-GET-POSTS-SIMPLE', allWorkers)
    // yield  takeLatest('INCREMENT', testGen)
    // yield  take('ACTION-GET-POSTS-SIMPLE')

}

function* commonWatcher() {
    yield race([postsWatcher()])
}

sagaMiddle.run(commonWatcher)