const router = require('express').Router();

let UserList = require('../models/userList.model');
let OTKList = require('../models/otkList.model');
let TeamList = require('../models/teamList.model');
let GameList = require('../models/gameList.model');
let PlayerList = require('../models/playerList.model');

let Activity = UserList;


const User = require('..userList.model');

router.route('/user/add').post(async (req, res) => {
  const activity = req.body.activity;
  
  // create a new User object
  const newUser = new User({
    activity,
  });
  
  // save the new object (newUser)
  newUser
    .save()
    .then(() => res.json('Activity added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/user/:id').get((req, res) => {

  Activity = UserList;
  Activity.findById(req.params.id)
    .then((activity) => res.json(activity))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/user/delete/:id').delete(async (req, res) => {

  Activity = UserList;
await Activity.findByIdAndDelete(req.params.id)
    .then(() => res.json('Activity deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/user/update/:id').post(async (req, res) => {
  Activity = UserList;
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

router.route('/team/add').post(async (req, res) => {
  Activity = TeamList;
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

router.route('/team/:id').get((req, res) => {
  Activity = TeamList;

  Activity = getList(req.params.collection);
  Activity.findById(req.params.id)
    .then((activity) => res.json(activity))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/team/delete/:id').delete(async (req, res) => {
  Activity = TeamList;

  Activity = getList(req.params.collection);
await Activity.findByIdAndDelete(req.params.id)
    .then(() => res.json('Activity deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/team/update/:id').post(async (req, res) => {
  Activity = TeamList;
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


module.exports = router;
