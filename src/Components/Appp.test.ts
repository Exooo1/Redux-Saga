import {getPostsTakeEvery, testGen} from "../Store/posts";
import {apiPosts} from "../Api/apiPosts";
import {call, put} from "redux-saga/effects";

test('', () => {
    const gen = getPostsTakeEvery()
    console.log(gen.next().value)
    // expect(gen.next().value).toEqual(call(apiPosts.getPosts));
})