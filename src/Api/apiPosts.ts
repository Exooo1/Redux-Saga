import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/'
})

export const apiPosts = {
    getPosts() {
        return instance.get('posts')
    }
}