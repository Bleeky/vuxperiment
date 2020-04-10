import { Model } from '@vuex-orm/core';
import Ability from 'models/Ability';

export default class Card extends Model {
  static entity = 'cards'

  static fields() {
    return {
      cardId: this.attr(null),
      name: this.attr(''),
      types: this.attr(''),
      abilities: this.hasMany(Ability, 'cardId', 'cardId'),
      image: this.attr(''),
    };
  }
}
