import { Model } from '@vuex-orm/core';
import Ability from 'models/Ability';

export default class Card extends Model {
  static entity = 'cards'

  static primaryKey = 'cardId'

  static fields() {
    return {
      pokemonId: this.attr(null),
      cardId: this.attr(null),
      name: this.attr(''),
      types: this.attr(''),
      abilities: this.hasMany(Ability, 'cardId', 'cardId'),
      image: this.attr(''),
    };
  }
}
