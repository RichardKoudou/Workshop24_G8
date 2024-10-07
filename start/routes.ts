/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
//import AutoSwagger from "adonis-autoswagger";
//import swagger from "#config/swagger";
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
//import PostsController from '#controllers/posts_controller'
import UsersController from "#controllers/users_controller";
//import { Helpers } from "@adonisjs/core/ace";
//import auth_middleware from "#middleware/auth_middleware";

router.get('/', async () => {
  return {
    hello: 'world',
  }
})
//router.post('users', 'AuthController.register').as('authRegister')*/

const AuthController = () => import('#controllers/auth_controller')

router.group(() => {
  router.post('register', [AuthController, 'register'])
  router.post('login/:id', [AuthController, 'login'])
  router.post('logout/:id', [AuthController, 'logout']).use(middleware.auth())
}).prefix('PilePoil/v1/auth')

/*router.group(() => {
  router.post('uploadPosts', [PostsController, 'store']);
  router.get('allPosts', [PostsController, 'index']);
  router.get('post/:id', [PostsController, 'show']);
  router.patch('editPost/:id', [PostsController, 'update']);
  router.delete('deletePosts/:id', [PostsController, 'destroy']);
}).prefix('PilePoil/v1/posts').use(middleware.auth())*/

router.group(() => {
  router.get('allUsers', [UsersController, 'show'])
}).prefix('PilePoil/v1/users').use(middleware.auth());



router.get('PilePoil/v1/users/:id/profile', async ({auth, response}) => {
  try{
    const user = auth.getUserOrFail()
    return response.ok(user)
  } catch (error) {
    return response.unauthorized({error : 'User not found'})
  }
}).use(middleware.auth({
  guards: ['api']
}))