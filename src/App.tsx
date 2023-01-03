import React from 'react';
import './App.css';
import {useAppDispatch} from "./Store/reduxUtils";
import {ButtonThrottle} from "./Components/ButtonThrottle";

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
            </div>
        </div>
    );
}

export default App;
const res = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(3)
        }, 5000)
    })
}

function* get() {
    yield  1
    yield res().then(res => res)
    yield 2
}

const generator = get()
console.log(generator.next())
console.log(generator.next())
console.log(generator.next())