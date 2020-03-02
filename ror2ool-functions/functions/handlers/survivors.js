const { admin, db } = require('../util/admin');
const { config } = require('../util/config');

exports.getAllSurvivors = (req, res) => {
    db.collection("survivors")
      .orderBy("name", "asc")
      .get()
      .then(data => {
        let survivors = [];
        data.forEach(doc => {
          survivors.push({
            survivorId: doc.id,
            ...doc.data()
          });
        });
        return res.json(survivors);
      })
      .catch(err => {console.error(err)
    res.status(500).json({error: err.code})
    });
}

exports.addSurvivor = (req, res) => {

  const newSurvivor = {
      imageUrl: req.body.imageUrl,
      name: req.body.name,
      health: req.body.health,
      healthRegen: req.body.healthRegen,
      damage: req.body.damage,
      speed: req.body.speed,
      armor: req.body.armor,
      unlock: req.body.unlock,
    };

    const noImg = 'image-missing.png'

    db.collection("survivors")
      .add(newSurvivor)
      .then(doc => {
        res.json({ message: `document ${doc.id} created successfully` });
      })
      .catch(err => {
        res
          .status(500)
          .json({
            error: `something went wrong, survivor ${req.body.name} not added`
          });
        console.error(err);
      });
  }

  exports.addSurvivorImage = (req, res) => {
    const BusBoy = require('busboy');
    const path = require('path');
    const os = require('os');
    const fs = require('fs');

    const busboy = new BusBoy({headers: req.headers});

    let imageFileName;
    let imageToBeUploaded = {};

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      console.log(fieldname);
      console.log(filename);
      console.log(mimetype);
      const imageExtension = filename.split('.')[filename.split('.').length - 1];
      imageFileName = `${Math.round(Math.random()*100000000)}.${imageExtension}`;
      const filepath = path.join(os.tmpdir(), imageFileName);
      imageToBeUploaded = { filepath, mimetype }
      file.pipe(fs.createWriteStream(filepath))
    });
    busboy.on('finish', () => {
      admin.storage().bucket().upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype
          }
        }
      })
      .then(() => {
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
        return db.doc(`/survivors/${req.survivor.name}`).update({ imageUrl })
      }).then(() => {
        return res.json({message: 'Image uploaded successfully'});
      }).catch(err => {
        console.error(err);
        res.status(500).json({error: error.code})
      })
    });
  }