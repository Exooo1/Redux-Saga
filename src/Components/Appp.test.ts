import {getPostsTakeEvery, testGen} from "../Store/posts";
import {apiPosts} from "../Api/apiPosts";
import {call} from "redux-saga/effects";

test('', () => {
    const gen = testGen()

    console.log(gen.next())
})