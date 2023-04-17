const router = require('express').Router();
let UserList = require('../models/userList.model');
let TeamList = require('../models/teamList.model');
let GameList = require('../models/gameList.model');
let PlayerList = require('../models/playerList.model');
let Activity = UserList;


// The following block describe the 5 routes for the first of the 4 schema model
// Each block is essencially the same, changing only the name of the variables and the Shema.
router.route('/user/add').post(async (req, res) => { //route to add a new document on the database
  
  Activity = UserList; //this line allows the reuse of most lines of codes on the following blocks.
  
  //getting all current docs from the collection
  const docs = await Activity.find();
  const size =  docs.length;  //size of collection for ID generation

  const {email, password, teamName, coachName} = req.body; //getting the variables from the body
  
  var id = 10001 + size; //getting a ID for this new document
  var teamId = id + 10000; //teams have ids that start at 20000, while users have ID starting at 10000.

  user = new UserList({ //assigning the read variables to the document that will be sent to database
    id, email, password, teamId
  });

  id = teamId;    //reuse of id variable, now for the team creation
  var coachInfo = email;  //getting the last variable from the body

  var geo = [0,0]
  team = new TeamList({  //assigning the read variables to the document that will be sent to database
    id, teamName, coachName, coachInfo, geo
  });
  
  try{    
    user  //add document to database
      .save()
      .catch((err) => res.status(400).json('Error: ' + err));
    team  //add document to database
      .save()
      .then(() => res.json('Activity added!'))
      .catch((err) => res.status(400).json('Error: ' + err));

  }catch(err)
  {
    console.log(err.message);
  }

});

router.get("/user/", async (req, res) => {  //route to get all documents from collection
  let Activity = UserList;
  try {

    const doc = await Activity.find(); //gettin all docs from collection

    if (!doc) return res.status(404).json({ msg  : "Doc not found" });
    res.json(doc); //return all docs from collection
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Doc not found" });

    res.status(500).send("Server Error");
  }
});

router.get("/user/:id", async (req, res) => { //filter the collection for a document with specific ID
  Activity = UserList; 
  try {
    const id1 = req.params.id; //getting the requested id from the body
    const docs = await Activity.find(); //getting all documents from collection
    var doc = docs.find(doc => doc.id == id1); //filtering the document with the chosen id
   

    if (!doc) return res.status(404).json({ msg  : "Doc not found" });
    res.json(doc); //return the filterd document, if exists.
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Doc not found" });

    res.status(500).send("Server Error");
  }
});

router.route('/user/delete/:id').delete(async (req, res) => { //route to delete document with specific ID
  Activity = UserList;
    const id1 = req.params.id; //get requested id
    const docs = await Activity.find(); //get all documents
    var doc = docs.find(doc => doc.id = id1); //get document with requested id
  await Activity.findByIdAndDelete(doc._id) //with the requested document, delete document with using its _id
      .then(() => res.json('Activity deleted.'))
      .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/user/update/:id').post(async (req, res) => {//route to update document with specific ID
  let Activity = UserList;
  try {
    const id = req.params.id; //get requested id
    const docs = await Activity.find();// get all documents
    var doc = docs.find(doc => doc.id == id); //filter doc to be updated
    if (!doc) return res.status(404).json({ msg  : "Doc not found" });
    const dbId = doc._id; //get _id of found document

    await  Activity.findByIdAndUpdate(dbId,req.body)  //updatig the chosen _id with the request on the frontend body
        .then(() => res.json('Activity updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Doc not found" });

    res.status(500).send("Server Error");
  }

});



//the following routes repeat the first 5 for the other collections of the database.
router.route('/team/add').post(async (req, res) => {
  
  Activity = TeamList;
  
  const docs = await Activity.find();
  const size =  docs.length;

  const {teamName,
    description,
    location,
    days,
    geotag,
    logo,
    coachName,
    coachInfo,
    open,
    playersId} = req.body;

  var id = 20001 + size;
  // id = String(id);

  team = new Activity({
    id, 
    teamName,
    description,
    location,
    days,
    geotag,
    logo,
    coachName,
    coachInfo,
    open,
    playersId
  });

  try{
    team
      .save()
      .then(() => res.json('Activity added!'))
      .catch((err) => res.status(400).json('Error: ' + err));
  }catch(err){
    console.log(err.message);
  }
  
});

router.get('/team/', async (req, res) => {

  Activity = TeamList;
  try {
    
    const doc = await Activity.find();

    if (!doc) return res.status(404).json({ msg  : "Doc not found" });
    res.json(doc);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Doc not found" });

    res.status(500).send("Server Error");
  }
});

router.get('/team/:id', async (req, res) => {

    Activity = TeamList;
    try {
      const id1 = req.params.id;
      const docs = await Activity.find();

      var doc = docs.find(doc => doc.id == id1);
      
      if (!doc) return res.status(404).json({ msg  : "Doc not found" });
      res.json(doc);
    } catch (err) {
      console.error(err.message);
  
      if (err.kind === "ObjectId")
        return res.status(404).json({ msg: "Doc not found" });
  
      res.status(500).send("Server Error");
    }
});

router.route('/team/delete/:id').delete(async (req, res) => {
  Activity = TeamList;
  const id1 = req.params.id;
  const docs = await Activity.find();
  var doc = docs.find(doc => doc.id = id1);

await Activity.findByIdAndDelete(doc._id)
    .then(() => res.json('Activity deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/team/update/:id').post(async (req, res) => {
  Activity = TeamList;
  try {
    const id = req.params.id;
    const docs = await Activity.find();
    var doc = docs.find(doc => doc.id == id);
    if (!doc) return res.status(404).json({ msg  : "Doc not found" });
    
    const dbId = doc._id;

    await  Activity.findByIdAndUpdate(dbId,req.body)
        .then(() => res.json('Activity updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));


  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Doc not found" });

    res.status(500).send("Server Error");
  }

});


router.route('/player/add').post(async (req, res) => {
  Activity = PlayerList;
  
  const docs = await Activity.find();
  const size =  docs.length;

  const {name,
    teamId,
    position,
    DOB,
    contact,
    injuries,
    active,
    medical
  } = req.body;

  var id = 30001 + size;
  //id = String(id);

  player = new Activity({
    id,
    teamId,
    name,
    position,
    DOB,
    contact,
    injuries,
    active,
    medical
    });

    try{
      player
        .save()
        .then(() => res.json('Activity added!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    }catch(err){
      console.log(err.message);
    }

  });

router.get('/player/', async (req, res) => {
  Activity = PlayerList;
  try {
  
    const doc = await Activity.find();

    if (!doc) return res.status(404).json({ msg  : "Doc not found" });
    res.json(doc);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Doc not found" });

    res.status(500).send("Server Error");
  }
});

router.get('/player/:id', async (req, res) => {
  Activity = PlayerList;
  try {
    const id1 = req.params.id;
    const docs = await Activity.find();
    var doc = docs.find(doc => doc.id == id1);
    
    if (!doc) return res.status(404).json({ msg  : "Doc not found" });
    res.json(doc);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Doc not found" });

    res.status(500).send("Server Error");
  }
});

router.route('/player/delete/:id').delete(async (req, res) => {
  Activity = PlayerList;
  const id1 = req.params.id;
  const docs = await Activity.find();
  var doc = docs.find(doc => doc.id = id1);

await Activity.findByIdAndDelete(doc._id)
    .then(() => res.json('Activity deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/player/update/:id').post(async (req, res) => {
  Activity = PlayerList;
  try {

    const id = req.params.id;
    const docs = await Activity.find();
    var doc = docs.find(doc => doc.id == id);
    if (!doc) return res.status(404).json({ msg  : "Doc not found" });
    
    const dbId = doc._id;
    await  Activity.findByIdAndUpdate(dbId,req.body)
        .then(() => res.json('Activity updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));

  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Doc not found" });

    res.status(500).send("Server Error");
  }

});

router.route('/game/add').post(async (req, res) => {
  Activity = GameList;
  const docs = await Activity.find();
  const size =  docs.length;

  const {id1,
    id2,
    date,
    datenumber,
    location,
    result
  } = req.body;

  var id = 40001 + size;
  id = String(id);

  game = new Activity({
    id, 
    id1,
    id2,
    date,
    datenumber,
    location,
    result});

    try{
      game
        .save()
        .then(() => res.json('Activity added!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    }catch(err){
      console.log(err.message);
    }

  });

router.get('/game/', async (req, res) => {
  Activity = GameList;
  try {
    
    const doc = await Activity.find();
    
    if (!doc) return res.status(404).json({ msg  : "Doc not found" });
    res.json(doc);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Doc not found" });

    res.status(500).send("Server Error");
  }
});

router.get('/game/:id', async (req, res) => {
  Activity = GameList;
  try {
    const id1 = req.params.id;
    const docs = await Activity.find();

    var doc = docs.find(doc => doc.id == id1);
    
    if (!doc) return res.status(404).json({ msg  : "Doc not found" });
    res.json(doc);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Doc not found" });

    res.status(500).send("Server Error");
  }
});

router.route('/game/delete/:id').delete(async (req, res) => {
  Activity = GameList;
  const id1 = req.params.id;
  const docs = await Activity.find();
  var doc = docs.find(doc => doc.id = id1);

await Activity.findByIdAndDelete(doc._id)
    .then(() => res.json('Activity deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/game/update/:id').post(async (req, res) => {s
  Activity = GameList;
  try {
    const id = req.params.id;
    const docs = await Activity.find();
    var doc = docs.find(doc => doc.id == id);
    if (!doc) return res.status(404).json({ msg  : "Doc not found" });
    
    const dbId = doc._id;

    await  Activity.findByIdAndUpdate(dbId,req.body)
    .then(() => res.json('Activity updated!'))
    .catch((err) => res.status(400).json('Error: ' + err));


  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Doc not found" });

    res.status(500).send("Server Error");
  }

});



module.exports = router;