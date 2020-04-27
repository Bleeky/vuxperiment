import { Model } from '@vuex-orm/core';

export default class CardAbility extends Model {
    static entity = 'cardAbility'

    static primaryKey = ['cardId', 'url']

    static fields() {
      return {
        cardId: this.attr(null),
        url: this.attr(null),
      };
    }
}
