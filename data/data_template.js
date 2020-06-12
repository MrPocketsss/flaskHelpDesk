var compendium = {
  'items': [
    {
      'name': "Copper (cp)",
      'type': "currency",
      'weight': "0.02",
      'text': "The least valuable coin available, ten copper coins is equivalent to one silver coin. A standard coin weighs about a third of an ounce, so fift coins weigh a pound.",
      'source': "Player's Handbook p. 143"
    },
    {
      'name': "Electrum (ep)",
      'type': "currency",
      'weight': "0.02",
      'text': "An unusual metal coin, electrum pieces originate from fallen empires and lost kingdoms, sometimes arousing suspicion and skepticism when used in transactions.\pOne electrum coin is worth five silver coins.",
      'source': "Player's Handbook p.143"
    },
    {
      'name': "Gold (gp)",
      'type': "currency",
      'weight': "0.02",
      'text': "The standard unit of measure for wealth, even if the coin itself is not commonly used. One gold coin is worth ten silver coins.\pA standard coin weighs about a third of an ounce, so fifty coins weigh a pound.\pWhen merchants discuss deals that involve goods or services worth hundreds or even thousands of gold pieces, the transactions don't usually involve the exchange of individual coins. Rather, the gold piece is a standard measure of value, and the actual exchange is in gold bars, letters of credit, or valuable goods.",
      'source': "Player's Handbook p.143"
    },
    {
      'name': "Platinum (pp)",
      'type': "currency",
      'weight': "0.02",
      'text': "An unusual metal coin, platinum pieces originate from fallen empires and lost kingdoms, sometimes arousing suspicion and skepticism when used in transactions.\pOne platinum coin is worth ten gold coins.",
      'source': "Player's Handbook p.143"
    },
    {
      'name': "Siver (sp)",
      'type': "currency",
      'weight': "0.02",
      'text': "A coin common among commoners, one silver coin is worth ten copper coins.\pA standard coin weighs about a third of an ounce, so fifty coins weigh a pound.",
      'source': "Player's Handbook p.143"
    },
    {
      'name': "Arrow of Slaying",
      'type': "Arrow",
      'magic': true,
      'rarity': "very rare",
      'weight': "0.05",
      'text': "An arrow of slaying is a magic weapon meant to slay a particular kind of creature. Some are more focused than others. For example, there are arrows of dragon slaying and arrows of blue dragon slaying. If a creature belonging to the type, race, or group associated with an arrow of slaying takes damage from the arrow, the creature must make a DC 17 Constitution saving throw, taking an extra 6d10 piercing damage on a failed save, or half as much extra damage on a successful one.\pOnce an arrow slaying deals its extra damage to a creature, it becomes a nonmagical arrow.",
      'source': "Dungeon Master's Guide p. 152"
    },
  ],
  'player-races': [],
  'player-classes': [],
  'spells': [],
  
};
/* jshint ignore: start */
    {
      'name': "",     //what is the item called
      'type': "",     //what item category does it belong to
      'weight': "",   //how much does the item weigh (in pounds)
      'text': "",     //the item's description
      'source': "",   //book and page number reference for item
      'magic': true,  //is the item magical (boolean)
      'rarity': "",   //how rare is the item
      'roll': ""      //any dice roll needed for the item
    },
    

equipment:
  armor:
    name: str
    cost: int
    armor class: str
    strength: str
    stealth: str
    weight: int
    description: str
    don/doff: arr
  weapons:
    name: str
    cost: int
    type: str
    damage: str
    weight: int
    properties: arr
    description: str
  Adventuring gear:
    name: str
    cost: int
    weight: int
    type: str
    description: str
  Tools:
    name: str
    cost: int
    weight: int
    type: str
    description: str
  Mounts and Vehicles:
    name: str
    cost: int
    speed: str
    carrying capacity: int
    description: str
  Trade Goods:
    name: str
    cost: int
    description: str
/* jshint ignore: end */