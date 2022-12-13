import axios from 'axios'
const instance = axios.create({
    baseURL: 'https://hacker-news.firebaseio.com/v0/'
})


export const fetchLastNews = async () => {
    const response = await instance.get('newstories.json?print=pretty')
    return response.data
}