import {getPostsTakeEvery, testGen} from "../Store/posts";
import {apiPosts} from "../Api/apiPosts";
import {call, put} from "redux-saga/effects";

test('', () => {
    const gen = getPostsTakeEvery()
    const result = gen.next()
    expect(result.value).toEqual(call(apiPosts.getPosts));
})