import { Model } from '@vuex-orm/core';

export default class Habitats extends Model {
    static entity = 'habitats'

    static fields() {
      return {
        name: this.attr(''),
      };
    }
}
