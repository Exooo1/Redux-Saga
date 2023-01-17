import {getPostsTakeEvery, setPosts, testGen} from "../Store/posts";
import {apiPosts} from "../Api/apiPosts";
import {call, put} from "redux-saga/effects";

test('', () => {
    const gen = getPostsTakeEvery()
    console.log(gen.next())
    console.log(gen.next())
    // expect(result.value).toEqual(call(apiPosts.getPosts));
    // expect(gen.next().value).toEqual(put(setPosts({posts: []})));
})