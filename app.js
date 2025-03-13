import { PORT } from "./config.js"
import express from "express"
import { countGenre, countGenres, getLongMovies, getMovies, getOneMovie } from "./movies.js"

const app = express()

app.listen(PORT, () => {
    console.log(`Web server started on port ${PORT}`)
})

app.get("/", (req, res) => {
    res.status(200).send("<h2>Please use our documentation to learn our API usage.</h2>")
})

app.get("/movies", (req, res) => {
    getMovies(res)
})

// skip movies by a set number
app.get("/movies/:page", (req, res) => {
    getMovies(res, Number(req.params.page))
})

app.get("/movies/long", (req, res) => {
    getLongMovies(res)
})

app.get("/movies/count/:genre", (req, res) => {
    countGenre(res, req.params.genre)
})

app.get("/movies/count/genres/:num", (req, res) => {
    console.log(typeof req.params.num)
    countGenres(res, Number(req.params.num))
})

app.get("/movies/find/:mID", (req, res) => {
    let mID = req.params.mID
    getOneMovie(res, mID)
})