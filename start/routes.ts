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
const UsersController = () => import('#controllers/users_controller')
const AnimalController = () => import('#controllers/animals_controller')

router
  .get('OPoil/v1/Home', async () => {})
  .use(
    middleware.auth({
      guards: ['api'],
    })
  )

/**
 * Auth routes
 * @constructor
 */
const AuthController = () => import('#controllers/auth_controller')

router
  .group(() => {
    router.post('register', [AuthController, 'register'])
    router.post('login/:id', [AuthController, 'login'])
    router.delete('logout/:id', [AuthController, 'logout']).use(middleware.auth())
  })
  .prefix('OPoil/v1/auth')

router
  .group(() => {
    router.get('allUsers', [UsersController, 'show'])
  })
  .prefix('OPoil/v1/users')

router
  .group(() => {
    router.get('allAnimals', [AnimalController, 'index'])
    router.get('animals/:id', [AnimalController, 'show'])
    router.post('uploadAnimals', [AnimalController, 'store'])
    router.delete('deleteAnimal/:id', [AnimalController, 'destroy'])
  })
  .prefix('OPoil/v1/animals')
  .use(middleware.auth())

router
  .get('OPoil/v1/users/:id/profile', async ({ auth, response }) => {
    try {
      const user = auth.getUserOrFail()
      return response.ok(user)
    } catch (error) {
      return response.unauthorized({ error: 'User not found' })
    }
  })
  .use(
    middleware.auth({
      guards: ['api'],
    })
  )

/**
 * Advice routes
 */
const AdviceController = () => import('#controllers/advice_controller')

router
  .group(() => {
    router.get('allAdvices', [AdviceController, 'index'])
    router.get('advices/:id', [AdviceController, 'show'])
    router.post('upload', [AdviceController, 'store'])
    router.put('update/:id', [AdviceController, 'update'])
  })
  .prefix('OPoil/v1/advices')
//.use(middleware.auth())

/**
 * Post routes
 */
const PostsController = () => import('#controllers/posts_controller')

router
  .group(() => {
    router.get('allPosts', [PostsController, 'index'])
    router.get('posts/:id', [PostsController, 'show'])
    router.post('upload', [PostsController, 'store'])
    router.put('update/:id', [PostsController, 'update'])
    router.delete('delete/:id', [PostsController, 'destroy'])
  })
  .prefix('OPoil/v1/posts')
// .use(middleware.auth())
