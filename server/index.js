require("dotenv").config();
const cors = require("cors");
const express = require("express");
const Anime = require("./models/Anime");
const multer = require("multer");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 8000;

db();
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000', 'https://animaniac-app.vercel.app/');
    // Other headers...
    next();
  });

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/uploads",express.static("uploads"));

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

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()*1E9)
        cb(null, uniqueSuffix + "-" + file.originalname );
    }
});

const upload = multer({ storage: storage});

app.post("/api/animes", upload.single("thumbnail"), async (req, res)=>{
    try {
        console.log(req.body);
        console.log(req.file);
        const newAnime = new Anime({
            title: req.body.title,
            jtitle: req.body.jtitle,
            slug: req.body.slug,
            score: req.body.score,
            studio: req.body.studio,
            release: req.body.release,
            genre : req.body.genre,
            synopsis : req.body.synopsis,
            thumbnail : req.file.filename
        })
        
        await Anime.create(newAnime);
        res.json("data added");
    } catch (error){
        res.status(500).json({error: "Failde to catch data!"});
    }
});

app.put("/api/animes", upload.single("thumbnail"), async (req, res)=>{
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