import { makeAutoObservable } from 'mobx'

class Main {

    newsIds = []
    news = []
    particularNew = {}
    comments = []
    nestedComments = {}
    isLoadingNews = false
    isLoadingComments = false
    isLoadingNested = false
    tempArr = []

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    convertDate(time) {
        const milliseconds = time * 1000
        const dateObj = new Date(milliseconds)
        return dateObj
    }

    fetchNews() {
        try {
            this.news = []
            this.isLoadingNews = true
            fetch('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty')
                .then(response => response.json())
                .then(json => {
                    this.newsIds = [...json]
                    const p = []
                    this.newsIds.splice(0, 80).map(newsId => {
                        fetch(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json?print=pretty`)
                            .then(response => response.json())
                            .then(json => {
                                json.time = this.convertDate(json.time).toLocaleString()
                                this.news.push(json)
                                if (this.news.length >= 75) {
                                    this.isLoadingNews = false
                                }
                            })
                    })
                })
                .then(() => {
                    if (this.news.length >= 75) {
                        this.isLoadingNews = false
                    }
                }).catch((err) => {
                    console.warn(err)
                    // alert(err)
                })
        } catch (err) {
            console.warn(err)
            console.log('Не удалось получить новости')
        }
    }
    fetchOne(id) {
        try {
            this.particularNew = []
            this.comments = []
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
                .then(response => response.json())
                .then(json => {
                    json.time = this.convertDate(json.time).toLocaleString()
                    this.particularNew = { ...json }
                    console.log(json)
                })
                .then(() => {
                    this.fetchComments()
                })
        } catch (err) {
            console.warn(err)
            console.log('Не удалось получить новость')
        }
    }
    fetchComments() {
        if (this.particularNew.descendants !== 0) {
            this.isLoadingComments = true
            this.comments = []
            this.particularNew.kids.map(cId => {
                fetch(`https://hacker-news.firebaseio.com/v0/item/${cId}.json?print=pretty`)
                    .then(response => response.json())
                    .then(json => {
                        this.isLoadingComments = true
                        json.time = this.convertDate(json.time).toLocaleString()
                        this.comments.push(json)
                        this.comments = this.comments.sort((a, b) => {
                            if (a.time > b.time) return 1
                            if (a.time === b.time) return 0
                            if (a.time < b.time) return -1
                        }).reverse()
                        this.isLoadingComments = false
                    })
            })
        }
    }
    fetchNestedComments(comment) {
        this.nestedComments[comment.id] = []
        this.isLoadingNested = true
        comment.kids.map(async (id) => {
            try {
                const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
                const json = await response.json()
                this.nestedComments[comment.id] = [...this.nestedComments[comment.id], json]
                // alert(comment.id in this.nestedComments)
                this.isLoadingNested = false
            } catch (err) {
                console.warn(err)
            }
        })
    }
}

export default new Main()