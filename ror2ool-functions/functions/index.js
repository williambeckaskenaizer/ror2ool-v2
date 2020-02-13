const functions = require('firebase-functions');
const admin = require('firebase-admin');


admin.initializeApp();

const express = require('express');
const app = express();

app.get('/survivors', (req, res) => {
    admin
    .firestore()
    .collection('survivors')
    .orderBy('name', 'asc')
    .get()
    .then((data) => {
        let survivors = [];
        data.forEach((doc) => {
            survivors.push({
                survivorId: doc.id,
                ...doc.data()
            });
        });
        return res.json(survivors);
    })
    .catch(err => console.error(err));
})

app.post('/survivor', (req, res) => {
    const newSurvivor = {
        name: req.body.name,
        health: req.body.health,
        healthRegen: req.body.healthRegen,
        damage: req.body.damage,
        speed: req.body.speed,
        armor: req.body.armor,
        unlock: req.body.unlock
    };
    admin
    .firestore()
    .collection('survivors')
    .add(newSurvivor)
    .then(doc => {
        res.json({ message: `document ${doc.id} created successfully`})
    })
    .catch(err => {
        res.status(500).json({error: 'something went wrong uwu'});
        console.error(err)
    });
});

//

exports.api = functions.https.onRequest(app);