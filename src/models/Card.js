import { Model } from '@vuex-orm/core';

export default class Card extends Model {
  static entity = 'cards'

  static fields() {
    return {
      id: this.attr(null),
      name: this.attr(''),
      type: this.attr(''),
    };
  }
}
