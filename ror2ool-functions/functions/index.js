const functions = require("firebase-functions");
const express = require("express");
const cors = require('cors');
const firebase = require("firebase");

const app = express();
app.use(cors());

const { getAllItems, addItem } = require("./handlers/items");
const { getAllSurvivors, addSurvivor } = require("./handlers/survivors");
const { getAllEnemies, addEnemy } = require("./handlers/enemies");
const { getAllChests, addChest } = require("./handlers/chests");
const { firebaseConfig } = require("./util/config");

firebase.initializeApp(firebaseConfig);

//Survivor routes
app.get("/survivors", getAllSurvivors);
app.post("/add-survivor", addSurvivor);

//Item routes
app.get("/items", getAllItems);
app.post("/add-item", addItem);

//Enemy routes
app.get("/enemies", getAllEnemies);
app.post("/add-enemy", addEnemy);

//Chest routes
app.get("/chests", getAllChests);
app.post("/add-chest", addChest);

exports.api = functions.https.onRequest(app);
