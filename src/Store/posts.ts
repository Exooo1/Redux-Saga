import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    call,
    put,
    delay,
    flush,
    fork,
    join,
    actionChannel,
    takeMaybe,
    take,
    all,
    race,
    select,
    cancel,
    spawn,
    cps
} from "redux-saga/effects";
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

export function* secondWorker() {
    try {
        const {data} = yield call(apiPosts.getPhotos)
        console.log(data)
    } catch (err) {
        console.log(err)
    }
}

// const doSomething = (param1: any, param2: any, callback: any) => {
//     console.log(param1, param2)
//     setTimeout(() => {
//         callback(param1 + param2)
//     }, 1000)
// }
const getPostsAPI = async (callback: any) => {
    const {data} = await apiPosts.getPosts()
    callback(data)
}


export function* getPostsTakeEvery() {
    try {
        const {data} = yield call(apiPosts.getPosts)
        // @ts-ignore
        // const result = yield cps(getPostsAPI,'foor','bar')
        // const result = yield cps(getPostsAPI)
        // console.log(result)
        const take = yield takeMaybe()
        console.log(take)
        // @ts-ignore
        // const data = yield fork(apiPosts.getPosts)
        // @ts-ignore
        // const result = yield join(data)
        // console.log(result)
        // console.log(data)
        // @ts-ignore
        // const data = yield spawn(apiPosts.getPosts)
        // const {data} = yield call(apiPosts.getPosts)
        // @ts-ignore
        const store = yield select((postsReducer) => postsReducer)
        console.log(store)
        // @ts-ignore
        const ac = yield flush(take.type)
        console.log(ac)
        // @ts-ignore
        // yield cancel(data)
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

// export function* allWorkers() {
//     // yield fork(secondWorker)
//     // yield fork(getPostsTakeEvery)
//     yield all([fork(secondWorker), fork(getPostsTakeEvery)])
// }

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
