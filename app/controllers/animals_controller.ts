import { HttpContext } from '@adonisjs/core/http'
import { AnimalValidator } from '#validators/animal'
import Animal from '#models/animal'

export default class AnimalController {

  async store({ request, response }: HttpContext) {
    const uploadAnimal = await request.validateUsing(AnimalValidator)

    const newAnimal = await Animal.create({
      species: uploadAnimal.species,
      user_id: uploadAnimal.user_id,
    })
    return response.created(newAnimal)
  }

  async destroy({ request, response }: HttpContext) {
    const { id } = request.params()
    const AnimalToRemove = await Animal.findByOrFail('id', id)
    await AnimalToRemove.delete()

    if (!response.ok) {
      return response.status(400).json({ message: 'This animal does not exist' })
    } else {
      return response.ok({ message: 'Deleted successfully' })

    }
  }

  async index({ response }: HttpContext) {
    const getAllAnimals = await Animal.all()
    return response.json(getAllAnimals)
  }

  async show({ request, response }: HttpContext) {
    const { id } = request.params()
    const animal = await Animal.findByOrFail('id', id)
    return response.json(animal)
  }

  async allAnimalsByUser({ request, response }: HttpContext) {
    const userId = request.body().user_id
    const animals = await Animal.query().where('user_id', userId)
    return response.json(animals)
  }
}
