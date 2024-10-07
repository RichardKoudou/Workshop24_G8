/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import UsersController from "#controllers/users_controller";

router.get('OPoil/v1/Home', async () => {}).use(middleware.auth({
  guards: ['api']}));

const AuthController = () => import('#controllers/auth_controller')

router.group(() => {
  router.post('register', [AuthController, 'register'])
  router.post('login/:id', [AuthController, 'login'])
  router.post('logout/:id', [AuthController, 'logout']).use(middleware.auth())
}).prefix('OPoil/v1/auth')

router.group(() => {
  router.get('allUsers', [UsersController, 'show'])
}).prefix('OPoil/v1/users').use(middleware.auth());



router.get('OPoil/v1/users/:id/profile', async ({auth, response}) => {
  try{
    const user = auth.getUserOrFail()
    return response.ok(user)
  } catch (error) {
    return response.unauthorized({error : 'User not found'})
  }
}).use(middleware.auth({
  guards: ['api']
}))