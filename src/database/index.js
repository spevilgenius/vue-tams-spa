import { Database } from '@vuex-orm/core'
import Hull from '@/models/Hull'
import Fleet from '@/models/Fleet'

const database = new Database()

database.register(Hull)
database.register(Fleet)

export default database
