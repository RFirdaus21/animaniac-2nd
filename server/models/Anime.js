const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnimeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
    },
    jtitle: {
        type: String,
    },
    thumbnail : {
        type: String,
    },
    release: {
        type: Number,
    },
    studio: {
        type: String,
    },
    genre: {
        type: Array,
    },
    synopsis: {
        type: String,
    },
    score: {
        type: String,
    },
});

module.exports = mongoose.model('Anime', AnimeSchema);