export default class Entity {
  id: number;

  name: string;

  hp: number;

  maxHp: number;

  mp: number;

  str: number;

  int: number;

  def: number;

  res: number;

  spd: number;

  luck: number;

  race: number;

  classe: number;

  rarity: number;

  isAlive: boolean;

  choice: string;

  constructor(id: number, name: string, hp: number, mp: number, str: number, int: number, def: number, res: number, spd: number, luck: number, race: number, classe: number, rarity: number) {
    this.id = id;
    this.name = name;
    this.hp = hp;
    this.maxHp = hp;
    this.mp = mp;
    this.str = str;
    this.int = int;
    this.def = def;
    this.res = res;
    this.spd = spd;
    this.luck = luck;
    this.race = race;
    this.classe = classe;
    this.rarity = rarity;
    this.isAlive = true;
    this.choice = '';
  }

  attack(entity: Entity) {
    const remainingLife: number = entity.hp - this.str;
    entity.hp = (remainingLife >= 0) ? remainingLife : 0;
    entity.isAlive = entity.hp > 0;
  }

  heal() {
    const life: number = this.hp + Math.ceil(this.maxHp / 2);
    this.hp = (life <= this.maxHp) ? life : this.maxHp;
  }

  getHealthBar() {
    let healthBar: string = '';
    for (let i: number = 0; i < this.maxHp; i += 1) {
      healthBar += i < this.hp ? '♥ ' : '_ ';
    }

    return healthBar;
  }

  play(entity: Entity, choice: string) {
    this.choice = choice;
    return this.choice === '1' ? this.attack(entity) : this.heal();
  }
}
