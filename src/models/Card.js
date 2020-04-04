import { Model } from '@vuex-orm/core';

export default class Card extends Model {
  static entity = 'cards'

  static fields() {
    return {
      cardId: this.attr(null),
      name: this.attr(''),
      types: this.attr(''),
      image: this.attr(''),
    };
  }
}
