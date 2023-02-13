import Entity from './entity';

export default class Boss extends Entity {
  heal() {
    const life: number = Math.ceil(this.maxHp / 50) + this.hp;
    this.hp = (life <= this.maxHp) ? life : this.maxHp;
  }
}
