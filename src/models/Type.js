import { Model } from '@vuex-orm/core';

export default class Type extends Model {
    static entity = 'types'

    static beforeCreate(model) {
      if (model.name === 'shadow') return false;
      model.icon = `Icon${model.name.charAt(0).toUpperCase() + model.name.slice(1)}`;
    }

    static fields() {
      return {
        name: this.attr(''),
        icon: this.attr(''),
      };
    }
}
