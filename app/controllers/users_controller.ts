import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async show({ response }: HttpContext) {
    const getAllUsers = await User.all()
    return response.json(getAllUsers)
  }
}
