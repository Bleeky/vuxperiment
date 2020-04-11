import { Model } from '@vuex-orm/core';
import Ability from 'models/Ability';

export default class Pokemon extends Model {
  static entity = 'pokemons'

  static primaryKey = 'url'

  static beforeCreate(model) {
    model.name = (model.name.charAt(0).toUpperCase() + model.name.slice(1)).replace(/-/g, ' ');
  }

  static beforeUpdate(model) {
    model.name = (model.name.charAt(0).toUpperCase() + model.name.slice(1)).replace(/-/g, ' ');
  }

  get id() {
    const split = this.url.split('/');
    return split[split.length - 2];
  }

  static fields() {
    return {
      url: this.attr(''),
      name: this.attr(''),
      pokemonId: this.attr(null),
      image: this.attr(''),
      types: this.attr(''),
      abilities: this.hasMany(Ability, 'cardId'),
    };
  }
}
