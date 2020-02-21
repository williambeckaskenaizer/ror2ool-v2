let db = {
  survivors: [
    {
      name: "name",
      health: "health value + scaling",
      healthRegen: "regen value + scaling",
      damage: "damage value + scaling",
      speed: "speed value in m/s",
      armor: "flat armor value",
      unlock: "name of challenge required to unlock"
    }
  ],
  items: [
    {
      name: "item name",
      rarity: "item rarity",
      description: "item description",
      category: "item category",
      unlock: "challenge required to unlock"
    }
  ],
  enemies: [
    {
      name: "name",
      health: "health value + scaling",
      damage: "damage value + scaling",
      speed: "speed value in m/s"
    }
  ],
  chests: [
    {
      name: "chest name",
      itemtype: "type of item dropped",
      possiblerarity: "possible item colors dropped",
      whitechance: "chance for white rarity item",
      greenchance: "chance for green rarity item",
      redchance: "chance for red rarity item",
      basecost: "chest base cost"
    }
  ]
};
