const { db } = require("../util/admin")
const { config } = require('../util/config');


exports.getAllItems = (req, res) => {
  db.collection("items")
    .orderBy("name", "asc")
    .get()
    .then(data => {
      let items = [];
      data.forEach(doc => {
        items.push({
          itemId: doc.id,
          ...doc.data()
        });
      });
      return res.json(items);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.addItem = (req, res) => {
  const newItem = {
    name: req.body.name,
    rarity: req.body.rarity,
    description: req.body.description,
    category: req.body.category,
    unlock: req.body.unlock
  };
  db.collection("items")
    .add(newItem)
    .then(doc => {
      res.json({ message: `document ${doc.name} created successfully` });
    })
    .catch(err => {
      res.status(500).json({
        error: `something went wrong, item ${req.body.name} not added`
      });
      console.error(err);
    });
};