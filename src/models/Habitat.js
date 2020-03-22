import { Model } from '@vuex-orm/core';

const habitatsColors = {
  cave: 'rgba(181, 162, 104, 0.32)',
  forest: 'rgba(46, 101, 21, 0.32)',
  grassland: 'rgba(118, 181, 104, 0.32)',
  mountain: 'rgba(64, 49, 13, 0.32)',
  rare: '',
  'rough-terrain': 'rgba(110, 113, 53, 0.32)',
  sea: 'rgba(24, 112, 197, 0.32)',
  urban: 'rgba(189, 189, 189, 0.32)',
  'waters-edge': 'rgba(183, 208, 243, 0.32)',
};

export default class Habitats extends Model {
    static entity = 'habitats'

    static beforeCreate(model) {
      model.color = habitatsColors[model.name];
    }

    static fields() {
      return {
        name: this.attr(''),
        color: this.attr(''),
      };
    }
}
