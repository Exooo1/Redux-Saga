import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {call, put, delay, fork, actionChannel, take, all, race} from "redux-saga/effects";
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
export const actionGetUser = () => ({type: "ACTION-GET-POSTS", load: true})
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

export function* getPostsTakeEvery(action: ActionType) {
    try {
        const {data} = yield call(apiPosts.getPosts)
        // const {data} = yield fork(apiPosts.getPosts)
        // const {data} = yield fork(oneTask)
        // yield fork(twoTask)
        // const {data} = yield race([call(apiPosts.getPosts), call(apiPosts.getPhotos)])
        // const {data} = yield all([call(apiPosts.getPosts), call(apiPosts.getPhotos)])
        console.log(data)
        yield put(setPosts({posts: data}))
    } catch (err) {
        console.log(err)
    }

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