const router = require('express').Router();



let UserList = require('../models/userList.model');
let TeamList = require('../models/teamList.model');
let GameList = require('../models/gameList.model');
let PlayerList = require('../models/playerList.model');
let Activity = UserList;

router.route('/user/add').post(async (req, res) => {
  Activity = UserList;
  
  const docs = await Activity.find();
  const size =  docs.length;

  const {email, password, teamName, coachName} = req.body;
  var id = 10001 + size;
  var teamId = id + 10000;
  // id = String(id);
  // teamId = String(id);

  user = new UserList({
    id, email, password, teamId
  });

  var id = teamId;
  var coachInfo = email;

  team = new TeamList({
    id, teamName, coachName, coachInfo
  });
  
  try{
    user
      .save()
      .catch((err) => res.status(400).json('Error: ' + err));
    team
      .save()
      .then(() => res.json('Activity added!'))
      .catch((err) => res.status(400).json('Error: ' + err));

  }catch(err)
  {
    console.log(err.message);
  }

});

router.get("/user/", async (req, res) => {
  try {

    const doc = await UserList.find();
 

    if (!doc) return res.status(404).json({ msg  : "Doc not found" });
    res.json(doc);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Doc not found" });

    res.status(500).send("Server Error");
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const id1 = req.params.id;
    const docs = await UserList.find();
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

router.route('/user/delete/:id').delete(async (req, res) => {
  Activity = UserList;
    const id1 = req.params.id;
    const docs = await Activity.find();
    var doc = docs.find(doc => doc.id = id1);
  await Activity.findByIdAndDelete(doc._id)
      .then(() => res.json('Activity deleted.'))
      .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/user/update/:id').post(async (req, res) => {
  let Activity = UserList;
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





router.route('/team/add').post(async (req, res) => {
  
  Activity = TeamList;
  
  const docs = await Activity.find();
  const size =  docs.length;

  const {teamName,
    description,
    location,
    days,
    geolat,
    geolon,
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
    geolat,
    geolon,
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