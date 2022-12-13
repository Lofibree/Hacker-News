import { makeAutoObservable } from 'mobx'

class Main {

    newsIds = []
    news = []
    particularNew = {}
    comments = []
    
    constructor() {
        makeAutoObservable(this)
    }

    convertDate(time) {
        const milliseconds = time * 1000
        const dateObj = new Date(milliseconds)
        return dateObj
    }

    fetchNews() {
        try {
            fetch('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty')
                .then(response => response.json())
                .then(json => {
                    this.newsIds = [...this.newsIds, ...json]
                    this.newsIds.splice(0, 20).map(newsId => {
                        fetch(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json?print=pretty`)
                            .then(response => response.json())
                            .then(json => {
                                json.time = this.convertDate(json.time).toLocaleString()
                                this.news.push(json)
                            })
                    })
                })
        } catch (err) {
            console.warn(err)
            console.log('Не удалось получить новости')
        }
    }
    fetchOne(id) {
        try {
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
                .then(response => response.json())
                .then(json => {
                    json.time = this.convertDate(json.time).toLocaleString()
                    this.particularNew = { ...json }
                    console.log(json)
                })
                .then(() => {
                    if (this.particularNew.descendants !== 0) {
                        this.particularNew.kids.map(cId => {
                            fetch(`https://hacker-news.firebaseio.com/v0/item/${cId}.json?print=pretty`)
                                .then(response => response.json())
                                .then(json => {
                                    json.time = this.convertDate(json.time).toLocaleString()
                                    this.comments.push(json)            
                                })
                        })
                    }
                })
        } catch (err) {
            console.warn(err)
            console.log('Не удалось получить новость')
        }
    }
    
}

export default new Main()