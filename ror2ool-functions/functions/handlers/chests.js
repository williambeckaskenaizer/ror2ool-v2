const { db } = require("../util/admin");

exports.getAllChests = (req, res) => {
  db.collection("chests")
    .orderBy("name", "asc")
    .get()
    .then(data => {
      let chests = [];
      data.forEach(doc => {
        chests.push({
          chestId: doc.id,
          ...doc.data()
        });
      });
      return res.json(chests);
    })
    .catch(err => console.error(err));
};

exports.addChest = (req, res) => {
  const newChest = {
    name: req.body.name,
    itemtype: req.body.itemtype,
    possiblerarity: req.body.possiblerarity,
    whitechance: req.body.whitechance,
    greenchance: req.body.greenchance,
    redchance: req.body.redchance,
    basecost: req.body.basecost
  };
  db.collection("chests")
    .add(newChest)
    .then(doc => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch(err => {
      res.status(500).json({
        error: `something went wrong, chest ${req.body.name} not added`
      });
      console.error(err);
    });
};
