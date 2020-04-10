import { Model } from '@vuex-orm/core';

export default class Ability extends Model {
    static entity = 'abilities'

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
        url: this.attr(null),
        name: this.attr(null),
        effect: this.attr(null),
        cardId: this.attr(null),
      };
    }
}
