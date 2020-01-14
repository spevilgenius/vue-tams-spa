import { Model } from '@vuex-orm/core'
import Fleet from './Fleet'

export default class Hull extends Model {
  static entity = 'hulls'

  static fields() {
    return {
      id: this.uid(),
      spid: this.number(),
      fleet_id: this.string(null).nullable(),
      title: this.string(''),
      fleet: this.belongsTo(Fleet, 'fleet_id'),
      sortcode: this.string(''),
      name: this.string(''),
      classname: this.string('')
    }
  }
}
