const router = require('express').Router();


let UserList = require('../models/userList.model');
let OTKList = require('../models/otkList.model');
let TeamList = require('../models/teamList.model');
let GameList = require('../models/gameList.model');
let PlayerList = require('../models/playerList.model');

let Activity = UserList;

router.route('/user/add').post(async (req, res) => {
  Activity = UserList;
  
  const docs = await Activity.find();
  const size =  docs.length;
  console.log(size);

  const {name, password} = req.body;
  var id = 10001 + size;
  id = String(id);

  user = new UserList({
    id, name, password
  });

  try{
    user
      .save()
      .then(() => res.json('Activity added!'))
      .catch((err) => res.status(400).json('Error: ' + err));
  }catch(err)
  {
    console.log(err.message);
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
  
  try {
    const id = req.params.id;
    const docs = await UserList.find();
    var doc = docs.find(doc => doc.id == id);
    if (!doc) return res.status(404).json({ msg  : "Doc not found" });
    



    const {name, password} = req.body;
    user = new UserList({
      id, name, password
    });

    await Activity.findByIdAndDelete(doc._id)
    .catch((err) => res.status(400).json('Error: ' + err));

    try{
      user
        .save()
        .then(() => res.json('Activity Updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    }catch(err)
    {

      console.log(err.message);
    }


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

  const {name,
    description,
    location,
    days,
    geolat,
    geolon,
    logo,
    coachName,
    coachInfo,
    email,
    open} = req.body;

  var id = 20001 + size;
  id = String(id);

  team = new Activity({
    id, 
    name,
    description,
    location,
    days,
    geolat,
    geolon,
    logo,
    coachName,
    coachInfo,
    email,
    open
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
    
    const {name,
      description,
      location,
      days,
      geolat,
      geolon,
      logo,
      coachName,
      coachInfo,
      email,
      open} = req.body;

    team = new UserList({
      id, 
      name,
      description,
      location,
      days,
      geolat,
      geolon,
      logo,
      coachName,
      coachInfo,
      email,
      open
    });

    await Activity.findByIdAndDelete(doc._id)
    .catch((err) => res.status(400).json('Error: ' + err));

    try{
      team
        .save()
        .then(() => res.json('Activity Updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    }catch(err)
    {

      console.log(err.message);
    }


  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Doc not found" });

    res.status(500).send("Server Error");
  }

});










router.route('/player/add').post(async (req, res) => {
  Activity = PlayerList;
  const activity = req.body.activity;
  // create a new Activity object
  const newActivity = await new Activity({
    activity,
  });
  // save the new object (newActivity)
  newActivity
    .save()
    .then(() => res.json('Activity added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/player/:id').get((req, res) => {
  Activity = PlayerList;

  Activity = getList(req.params.collection);
  Activity.findById(req.params.id)
    .then((activity) => res.json(activity))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/player/delete/:id').delete(async (req, res) => {
  Activity = PlayerList;

  Activity = getList(req.params.collection);
await Activity.findByIdAndDelete(req.params.id)
    .then(() => res.json('Activity deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/player/update/:id').post(async (req, res) => {
  Activity = PlayerList;
  console.log(req.params.id);
await  Activity.findById(req.params.id)
    .then((activityforedit) => {
      activityforedit.activity = req.body.activity;

      activityforedit
        .save()
        .then(() => res.json('Activity updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/game/add').post(async (req, res) => {
  Activity = GameList;
  const activity = req.body.activity;
  // create a new Activity object
  const newActivity = await new Activity({
    activity,
  });
  // save the new object (newActivity)
  newActivity
    .save()
    .then(() => res.json('Activity added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/game/:id').get((req, res) => {
  Activity = GameList;

  Activity = getList(req.params.collection);
  Activity.findById(req.params.id)
    .then((activity) => res.json(activity))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/game/delete/:id').delete(async (req, res) => {
  Activity = GameList;

  Activity = getList(req.params.collection);
await Activity.findByIdAndDelete(req.params.id)
    .then(() => res.json('Activity deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/game/update/:id').post(async (req, res) => {
  Activity = GameList;
  console.log(req.params.id);
await  Activity.findById(req.params.id)
    .then((activityforedit) => {
      activityforedit.activity = req.body.activity;

      activityforedit
        .save()
        .then(() => res.json('Activity updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});


module.exports = router;