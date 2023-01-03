import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {call, put, delay} from "redux-saga/effects";
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

export function* getPostsTakeEvery(action: ActionType) {
    try {
        yield delay(5000)
        const {data} = yield call(apiPosts.getPosts)
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