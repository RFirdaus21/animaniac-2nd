require("dotenv").config();
const cors = require("cors");
const express = require("express");
const db = require("./db");
const Anime = require("./models/Anime");
const path = require("path")

const app = express();

const PORT = process.env.PORT || 8000;

db();
app.use(cors({
    origin: ['http://localhost:3000', 'https://animaniac-app.vercel.app'],
  }));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(path.resolve(), "public")));

console.log(path.join(path.resolve(), "public"))

app.get("/api/animes", async (req, res)=>{
    try {
        const genre = req.query.genre;
        const filter = {};
        if(genre) {
            filter.genre = genre;
        }
        const data = await Anime.find(filter);
        res.json(data);
    } catch (error){
        res.status(500).json({error: "Failde to catch data!"});
    }
});

app.get("/api/animes/:slug", async (req, res)=>{
    try {
        const slugParam = req.params.slug;
        
        const data = await Anime.findOne({slug:slugParam});
        res.json(data);
    } catch (error){
        res.status(500).json({error: "Failde to catch data!"});
    }
});

app.post("/api/animes", async (req, res)=>{
    try {
        console.log(req.body);

        if(!req.body.title){
            res.status(500).json({error: "Failed to catch data!"});
            return;
        }
        const newAnime = new Anime({
            title: req.body.title,
            jtitle: req.body.jtitle,
            slug: req.body.slug,
            score: req.body.score,
            studio: req.body.studio,
            release: req.body.release,
            genre: req.body.genre,
            synopsis: req.body.synopsis,
        })
        
        await Anime.create(newAnime);
        res.json("data added");
    } catch (error){
        console.error(error)
        res.status(500).json({error: "Failed to catch data!"});
    }
});

app.put("/api/animes", async (req, res)=>{
    try {
        const animeId = req.body.animeId;

        const updateAnime = {
            title: req.body.title,
            jtitle: req.body.jtitle,
            slug: req.body.slug,
            score: req.body.score,
            studio: req.body.studio,
            release: req.body.release,
            genre : req.body.genre,
            synopsis : req.body.synopsis,
        }

        if(req.file) {
            updateAnime.thumbnail = req.file.filename;
        }
        
        await Anime.findByIdAndUpdate(animeId, updateAnime);
        res.json("data changed");
    } catch (error){
        res.status(500).json({error: "Failed to catch data!"});
    }
});

app.delete("/api/animes/:id", async(req, res)=> {
    const animeId = req.params.id;

    try {
        await Anime.deleteOne({_id: animeId});
        res.json("deleted" + req.body.animeId);
    } catch (error) {
        res.json(error);
    }
});

app.get("*", (req, res) => {
    res.send("running");
});

app.listen(PORT, ()=> {
    console.log(`Server is Running on Port : ${PORT}`);
});