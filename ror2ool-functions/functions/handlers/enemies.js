const { db } = require("../util/admin");

exports.getAllEnemies = (req, res) => {
  db.collection("enemies")
    .orderBy("name", "asc")
    .get()
    .then(data => {
      let enemies = [];
      data.forEach(doc => {
        enemies.push({
          enemyId: doc.id,
          ...doc.data()
        });
      });
      return res.json(enemies);
    })
    .catch(err => console.error(err));
};

exports.addEnemy = (req, res) => {
  const newEnemy = {
    name: req.body.name,
    health: req.body.health,
    damage: req.body.damage,
    speed: req.body.speed
  };
  db.collection("enemies")
    .add(newEnemy)
    .then(doc => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch(err => {
      res.status(500).json({
        error: `something went wrong, enemy ${req.body.name} not added`
      });
      console.error(err);
    });
};
