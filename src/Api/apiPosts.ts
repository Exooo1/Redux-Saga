import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/'
})

export const apiPosts = {
    getPosts() {
        return instance.get('posts')
    },
    getPhotos(){
        return instance.get('photos')
    }
}