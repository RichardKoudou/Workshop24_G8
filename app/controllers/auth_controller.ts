import type { HttpContext } from '@adonisjs/core/http'
import { loginValidator } from '#validators/auth'
import User from '#models/user'
import { userValidator } from '#validators/user'
//import { AccessToken } from '@adonisjs/auth/access_tokens'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(userValidator)

    const user = await User.create(payload)

    return response.created(user)
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user, ['*'], {
      expiresIn: '30 days',
    })

    return response.ok({
      token: token,
    })
  }

  async logout({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const token = auth.user?.currentAccessToken.identifier
    if (!token) {
      return response.badRequest({ message: 'Token not found' })
    }
    await User.accessTokens.delete(user, token)
    return response.ok({ message: 'Logged out successfully' })
  }

  async profile({ auth, response }: HttpContext) {
    try {
      const user = await auth.getUserOrFail()
      return response.ok(user)
    } catch (error) {
      return response.unauthorized({ error: 'User not found' })
    }
  }
}
