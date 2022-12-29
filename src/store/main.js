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
                    this.newsIds.splice(0, 100).map(newsId => {
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
                    alert('Не удалось получить новости')
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
        // this.isLoadingNested = true
        comment.kids.map(async (id) => {
            try {
                const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
                const json = await response.json()
                json.time = this.convertDate(json.time).toLocaleString()
                this.nestedComments[comment.id] = [...this.nestedComments[comment.id], json]
                // alert(comment.id in this.nestedComments)
                if (json.id) { // есть ли коммент или же удален
                    this.nestedComments[comment.id].map(async (n) => {
                        if (n.kids) {
                            n["kidsObj"] = []
                            n.kids.map(async (id) => {
                                if (n["kidsObj"].length < n.kids.length) {
                                    const isCommentAlreadyExist = Boolean(n["kidsObj"].find(o => o.id === id))
                                    if (!isCommentAlreadyExist) {
                                        const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
                                        const json = await response.json()
                                        const isCommentAlreadyExist = Boolean(n["kidsObj"].find(o => o.id === id))
                                        if (!isCommentAlreadyExist) {
                                            json.time = this.convertDate(json.time).toLocaleString()
                                            n["kidsObj"] = [...n["kidsObj"], json]
                                        }
                                    }
                                }
                            })
                        }
                    })
                }
                // this.isLoadingNested = false
            } catch (err) {
                console.warn(err)
            }
        })
    }
    sortNews(type) {
        if (this.news.length !== 0) {
            // debugger
            switch (type) {
                case 'rating':
                    this.news = this.news.sort((a, b) => {
                        if (a.score > b.score) return -1
                        if (a.score === b.score) return 0
                        if (a.score < b.score) return 1
                    })
                    break;
                case 'comments number':
                    this.news = this.news.sort((a, b) => {
                        if (a.descendants > b.descendants) return -1
                        if (a.descendants === b.descendants) return 0
                        if (a.descendants < b.descendants) return 1
                    })
                    break;
            }
            // debugger

        }
    }
    // fetchNestedComments(comment) {
    //     this.nestedComments[comment.id] = []
    //     this.isLoadingNested = true
    //     comment.kids.map(async (id) => {
    //         try {
    //             const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
    //             const json = await response.json()
    //             json.time = this.convertDate(json.time).toLocaleString()
    //             this.nestedComments[comment.id] = [...this.nestedComments[comment.id], json]
    //             // alert(comment.id in this.nestedComments)
    //             this.isLoadingNested = false
    //         } catch (err) {
    //             console.warn(err)
    //         }
    //     })
    // }
}

export default new Main()