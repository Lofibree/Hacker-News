import { makeAutoObservable } from 'mobx'
import { fetchLastNews } from '../axios/axios'

class Main {

    newsIds = []
    news = []

    constructor() {
        makeAutoObservable(this)
    }

    fetchNews() {
        // fetchLastNews()
        fetch('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty')
            .then(response => response.json())
            .then(json => {
                this.newsIds = [...this.newsIds, ...json]
                this.newsIds.map(newsId => {
                    fetch(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json?print=pretty`)
                        .then(response => response.json())
                        .then(json => {
                            const unixTime = json.time
                            const milliseconds = unixTime * 1000
                            const dateObj = new Date(milliseconds)
                            json.time = dateObj.toLocaleString()
                            this.news.push(json)
                        })
                })

            })
    }
    sortByTime() {

    }
}

export default new Main()