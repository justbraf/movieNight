import { myCollection } from "./mongo.js"
import date from 'date-and-time'
import { ObjectId } from 'mongodb'

// List movies fifteen at a time
let getMovies = (res) => {
    myCollection.find({}, { limit: 15 }).project({ "title": 1, "plot": 1, "genres": 1, "cast": 1, "runtime": 1, "released": 1 }).toArray()
        // myCollection.find({}, { limit: 15 }).toArray()
        .then(resp => {
            if (!resp)
                resp = { "message": "No records found." }
            else {
                resp.forEach(doc => {
                    console.log(doc._id)
                    doc.released = date.format(doc.released, 'MMMM DD YYYY')
                    doc.runtime = `${Math.floor(doc.runtime / 60)}hrs ${doc.runtime % 60}mins`
                })
            }
            return res.status(200).json(resp)
        })
        .catch(err => {
            // console.log("error", err)
            return { "error": err }
        })
}

let getOneMovie = (res, mId) => {
    myCollection.findOne({ _id: new ObjectId(mId) }, { projection: { "title": 1, "plot": 1, "genres": 1, "cast": 1, "runtime": 1, "released": 1 } })
        .then(resp => {
            if (!resp)
                return res.status(200).json({ "message": "No records found." })

            resp.released = date.format(resp.released, 'MMMM DD YYYY')
            resp.runtime = `${Math.floor(resp.runtime / 60)}hrs ${resp.runtime % 60}mins`

            return res.status(200).json(resp)
        })
        .catch(err => {
            // console.log("error", err)
            return { "error": err }
        })
}


let countGenre = (res, gen) => {
    myCollection.find({ "genres": gen }).count()
        .then(resp => {
            resp = { "count": resp }
            console.log(resp)
            res.status(200).json(resp)
        })
}

let countGenres = (res, num) => {
    myCollection.find({}, { limit: num, sort: { title: -1 } }).toArray()
        .then(resp => {
            let genreList = []
            resp.forEach(doc => {
                if (doc.genres)
                    genreList.push(...doc.genres)
            })
            let genreCount = {}
            genreList.forEach(item => {
                genreCount[item] = (genreCount[item] || 0) + 1;
            })
            res.status(200).send(genreCount)
        })
}

let getLongMovies = (res) => {
    myCollection.find({ "runtime": { $gte: 90 } }, { limit: 10, sort: { runtime: 1 } }).project({ _id: 0, plot: 0, cast: 0, num_mflix_comments: 0, fullplot: 0, directors: 0, awards: 0, imdb: 0, writers: 0, countries: 0, tomatoes: 0 }).toArray()
        .then(resp => {
            res.status(200).json(resp)
        })
}

export { getMovies, getOneMovie, countGenre, countGenres, getLongMovies }