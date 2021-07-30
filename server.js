const express = require("express");
const path = require('path');
const fetch = require('node-fetch');
const KEY2 = require('./API/config');
const KEY = process.env.API_KEY || KEY2;
const app = express();


app.use(express.static(path.join(__dirname, '/client/build/')));

app.get('/api/trending', async (req, res) => {
    const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${KEY}`;
    const data = await fetch(url).then(res => res.json());
    res.json(data);
})

app.get('/api/searchfilms', async (req, res) => {
    let searchTerm = req.query.film;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=${searchTerm}`;
    const data = await fetch(url).then(res => res.json());
    res.json(data);
})

app.get('/api/searchvideos', async (req, res) => {
    let id = req.query.movie_id;
    const url= `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${KEY}&language=en-US`;
    const data = await fetch(url).then(res => res.json());
    res.json(data);
})

app.get('/api/filmdetails', async (req, res) => {
    let id = req.query.movie_id;
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=en-US`;
    const data = await fetch(url).then(res => res.json());
    res.json(data);
})

app.get('/api/cast', async (req, res) => {
    let id = req.query.movie_id;
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${KEY}&language=en-US`;
    const data = await fetch(url).then(res => res.json());
    res.json(data);
})

app.get('/api/actordetails', async (req, res) => {
    let id = req.query.actor_id;
    const url = `https://api.themoviedb.org/3/person/${id}?api_key=${KEY}&language=en-US`
    const data = await fetch(url).then(res => res.json());
    res.json(data);
})

app.get('/api/actorcredits', async (req, res) => {
    let id = req.query.actor_id;
    const url = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${KEY}&language=en-US`
    const data = await fetch(url).then(res => res.json());
    res.json(data);
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'))
    // console.log(path.join(__dirname, '../moobee/client/build/index.html'));
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`express server is running on ${PORT}`);
})