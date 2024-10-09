import { HttpContext } from '@adonisjs/core/http'
import Advice from '#models/advice'
import { AdviceValidator } from '#validators/advice'
import User from '#models/user'

export default class AdviceController {
  public async store({ request, response }: HttpContext) {
    const uploadAdvice = await request.validateUsing(AdviceValidator)
    const veto: User = await User.findOrFail(uploadAdvice.doctorId)

    const newAdvice = await Advice.create({
      comment: uploadAdvice.comment,
      doctorId: veto.id,
    })
    return response.created(newAdvice)
  }

  public async index({ response }: HttpContext) {
    const advices = await Advice.all()
    return response.ok(advices)
  }

  public async show({ params, response }: HttpContext) {
    const advice = await Advice.find(params.id)
    return response.ok(advice)
  }

  public async update({ request, params, response }: HttpContext) {
    const uploadAdvice = await request.validateUsing(AdviceValidator)
    const advice = await Advice.findOrFail(params.id)
    const veto: User = await User.findOrFail(uploadAdvice.doctorId)

    advice.comment = uploadAdvice.comment
    advice.doctorId = veto.id
    await advice.save()

    return response.ok(advice)
  }
}
