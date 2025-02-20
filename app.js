import { PORT } from "./config.js"
import express from "express"
import { countGenres, getLongMovies, getMovies, getOneMovie } from "./movies.js"

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

app.get("/movies/long", (req, res) => {
    getLongMovies(res)
})

app.get("/movies/count/:genre", (req, res) => {
    countGenres(res, req.params.genre)
})

app.get("/movies/find/:mID", (req, res) => {
    let mID = req.params.mID
    getOneMovie(res, mID)
})