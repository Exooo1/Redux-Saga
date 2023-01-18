import React, {useState} from 'react';
import './App.css';
import {useAppDispatch} from "./Store/reduxUtils";
import {ButtonThrottle} from "./Components/ButtonThrottle";
import {ButtonFork} from "./Components/ButtonFork";
import axios from "axios";
import {useDispatch} from "react-redux";

const obj = {
    isPosts: false,
    posts: []
}

const getPostsq = async () => {
    // if (!obj.isPosts) {
    //     obj.isPosts = true
    // } else {
    //     return
    // }
    // axios.get('https://jsonplaceholder.typicode.com/posts').then(res => {
    //     // @ts-ignore
    //     obj.posts = res
    //     obj.isPosts = false
    // })

    // @ts-ignore

    const one = axios.get('https://jsonplaceholder.typicode.com/posts')
    const two = axios.get('https://jsonplaceholder.typicode.com/photos')
    const d = await Promise.all([one, two])
}


function App() {
    const dispatch = useAppDispatch()
    // const disp = useDispatch()
    const getPosts = (type?: string) => {
        dispatch({type: type || 'ACTION-GET-POSTS-SIMPLE'})
    }
    const [name, setName] = useState<string>('')
    const [time, setTime] = useState<any>(0)
    const changeName = (e: any) => {
        setName(e.target.value)
        if (time) clearTimeout(time)
        setTime(setTimeout(() => {
            dispatch({type: 'ACTION-GET-POSTS-SIMPLE'})
        }, 1000))
    }
    return (
        <div className="App">
            <h1>
                Hello this is Redux-Saga!
            </h1>
            <input value={name} onChange={changeName} type="text"/>
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

