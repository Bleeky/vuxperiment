import { Model } from '@vuex-orm/core';

export default class Ability extends Model {
    static entity = 'abilities'

    static beforeCreate(model) {
      model.name = (model.name.charAt(0).toUpperCase() + model.name.slice(1)).replace(/-/g, ' ');
    }

    get getID() {
      const split = this.url.split('/');
      return split[split.length - 1];
    }

    static fields() {
      return {
        name: this.attr(''),
        url: this.attr(''),
      };
    }
}
