import React from 'react';
import './App.css';
import {useAppDispatch} from "./Store/reduxUtils";
import {ButtonThrottle} from "./Components/ButtonThrottle";
import {ButtonFork} from "./Components/ButtonFork";
import axios from "axios";

const obj = {
    isPosts: false,
    posts: []
}

const getPostsq = async () => {
    if (!obj.isPosts) {
        obj.isPosts = true
    } else {
        return
    }
    axios.get('https://jsonplaceholder.typicode.com/posts').then(res => {
        // @ts-ignore
        obj.posts = res
        obj.isPosts = false
    })
}


function App() {
    const dispatch = useAppDispatch()
    const getPosts = (type?: string) => {
        console.log(type)
        dispatch({type: type || 'ACTION-GET-POSTS-SIMPLE'})
    }
    return (
        <div className="App">
            <h1>
                Hello this is Redux-Saga!
            </h1>
            <div>
                <button onClick={() => getPosts()}>GetPosts</button>
                <ButtonThrottle func={getPosts}/>
                <ButtonFork func={getPosts}/>
                <button onClick={() => getPostsq()}>test</button>
            </div>
        </div>
    );
}

export default App;

