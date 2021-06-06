const Note = require('../models/note.model.js');

// Create and Save a new Product
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Name content can not be empty"
        });
    }
    if(!req.body.price) {
        return res.status(400).send({
            message: "Price content can not be empty"
        });
    }

    // Create a Product
    const note = new Note({
        name: req.body.name,
        price: req.body.price,
        description:req.body.description,
        image:req.body.image,
        tags:req.body.tags
    });

    // Save Product in the database
    note.save()
    .then(data => {
        res.status(201).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Product."
        });
    });
};

// Retrieve and return all Products from the database.
exports.findAll = (req, res) => {
    Note.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Products."
        });
    });
};

// Find a single Product with a productId
exports.findOne = (req, res) => {
    Note.findById(req.params.productId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });            
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Product with id " + req.params.productId
        });
    });
};

// Update a Product identified by the productId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "name content can not be empty"
        });
    }
    if(!req.body.price) {
        return res.status(400).send({
            message: "Price content can not be empty"
        });
    }
    // Find Product and update it with the request body
    Note.findByIdAndUpdate(req.params.productId, {
        name: req.body.name , 
        price: req.body.price,
        description:req.body.description,
        image:req.body.image,
        tags:req.body.tags
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Error updating Product with id " + req.params.productId
        });
    });
};

// Delete a Product with the specified productId in the request
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.productId)
    .then(note => {
        if(!note) {
            return res.status(200).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        res.send({id: note._id});
        //res.send(note._id);
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Product with id " + req.params.productId
        });
    });
};
