import React from 'react';
import './App.css';
import {useAppDispatch} from "./Store/reduxUtils";

function App() {
    const dispatch = useAppDispatch()
    const getPosts = () => {
        dispatch({type: 'ACTION-GET-POSTS'})
    }
    return (
        <div className="App">
            <h1>
                Hello this is Redux-Saga!
            </h1>
            <div>
                <button onClick={getPosts}>GetPosts</button>
            </div>
        </div>
    );
}

export default App;
