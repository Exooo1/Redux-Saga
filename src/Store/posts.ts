import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {call, put, delay, fork, actionChannel, take, all, race, select, cancel, spawn} from "redux-saga/effects";
import {apiPosts} from "../Api/apiPosts";

type PostType = {
    body: string
    id: number
    userId: number
    title: string
}
type InitialStateType = {
    posts: Array<PostType>
}
const initialState: InitialStateType = {
    posts: []
}
type ActionType = {
    type: 'ACTION-GET-POSTS',
    load: boolean
}
type GetPostsType = {
    posts: Array<PostType>
}

function* oneTask() {
    console.log('Hello')
    yield delay(3000)
    console.log('Bye')
}

function* twoTask() {
    console.log('Its me')
    console.log('how are you?')
}

const f = (state: any) => state.postsReducer
export const actionGetUser = (): ActionType => ({type: "ACTION-GET-POSTS", load: true})
type ActionTypes = ReturnType<typeof actionGetUser>

function* test() {
    yield delay(2000)
    const {data} = yield call(apiPosts.getPosts)
    return data
}

export function* getPostsTakeEvery() {
    try {
        // const {data} = yield call(apiPosts.getPosts)
        // console.log(data)
        // @ts-ignore
        // const data = yield spawn(apiPosts.getPosts)
        const data = yield fork(apiPosts.getPosts)
        // @ts-ignore
        // const store = yield select((postsReducer) => postsReducer)
        console.log(data)
        // @ts-ignore
        // const data = yield fork(test)
        // yield cancel(data)
        // @ts-ignore
        // const a = yield select(f)
        // console.log(a)

        // @ts-ignore
        // const action = yield call(apiPosts.getPosts)
        // // @ts-ignore
        // const state = yield select()
        // console.log('action', action)
        // console.log('state after', state)
        // const {data} = yield fork(apiPosts.getPosts)
        // const {data} = yield fork(oneTask)
        // yield fork(twoTask)
        // const {data} = yield race([call(apiPosts.getPosts), call(apiPosts.getPhotos)])
        // const {data} = yield all([call(apiPosts.getPosts), call(apiPosts.getPhotos)])
        yield put(setPosts({posts: data}))
    } catch (err) {
        console.log(err)
    }
}

export function* testGen() {
    yield  1
    return
}

const slice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {
        setPosts(state, action: PayloadAction<GetPostsType>) {
            state.posts = action.payload.posts
        }
    }
})

export const postsReducer = slice.reducer
export const {setPosts} = slice.actions
const b=(a:any,...b:any)=>{

}