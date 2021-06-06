const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    name: String,
    price: Number,
    description : String,
    image: String,
    tags: [String]
    }, 
    {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);