import userPath from './user'
import roleModulePermissions from './roleModulePermissions'
import departments from './departments'
import salers from './salers'

export const api = {
  ...userPath,
  ...roleModulePermissions,
  ...departments,
  ...salers
}
