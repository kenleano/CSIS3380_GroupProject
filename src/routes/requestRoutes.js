const express = require('express');
const router = express.Router();
const functions = require('./activitiesFunctions');

function asyncHandler(cb){
    return async (req,res, next) => {
        try {
            await cb(req, res, next);
        } catch(err) {
            next(err);
        }
    }
}

// Send a GET request to /db to READ all collections
router.get('/db', async (req, res)=>{
    const db = await functions.getDB();
    res.json(db);
});
// Send a GET request to /db/id to READ(view) a doc from a colection
router.get('/db/:id', async (req, res)=>{
    try {
        const doc = await functions.retrieveDocument(req.params.id, req.params.col);
        if(doc){
            res.json(doc);
        } else {
            res.status(404).json({message: "Document not found."});
        }
        
    } catch(err) {
        res.status(500).json({message: err.message});
    }
});


router.post('/db/add', asyncHandler( async (req, res)=>{

    if(req.params){
        const doc = await functions.createDocument(req.params, req.params.col);
        res.status(201).json(doc);
    } else {
        res.status(400).json({message: "Error."});
    }

}));


router.post('/db/addKey', asyncHandler( async (req, res)=>{

    if(req.params){
        const id = await functions.randomKey();
        return id;
    } else {
        res.status(400).json({message: "Error."});
    }

}));

// Send a PUT request to /db/:id to UPDATE (edit) a doc
router.put('/db/:id', asyncHandler(async(req,res) => {
    const doc = await functions.retrieveDocument(req.params.id, req.params.col);
    if(doc){

        await functions.updateDocument(req.params, req.params.col);
        res.status(204).end();
    } else {
        res.status(404).json({message: "Doc Not Found"});
    }
}));

// Send a DELETE request to /db/:id DELETE a doc 
router.delete("/db/:id", async(req,res, next) => {
    try {
        const doc = await functions.retrieveDocument(req.params.id, req.params.col);
        await functions.deleteDocument(doc, req.params.col);
        res.status(204).end();
    } catch(err){
        next(err);
    }
});


// Send a GET request to /quotes/quote/random to READ (view) a random quote



module.exports = router; 