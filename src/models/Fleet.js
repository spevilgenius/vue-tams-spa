import { Model } from '@vuex-orm/core'
import Hull from './Hull'

export default class Fleet extends Model {
  static entity = 'fleet'

  static fields() {
    return {
      id: this.uid(),
      fleet: this.string(''),
      hulls: this.hasMany(Hull, 'fleet_id')
    }
  }
}
