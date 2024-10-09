import { HttpContext } from '@adonisjs/core/http'
import Post from '#models/post'
import { postValidator } from '#validators/post'

export default class PostsController {
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(postValidator)

    const post = await Post.create(payload)

    return response.created(post)
  }

  async index({ response }: HttpContext) {
    const posts = await Post.all()
    return response.ok(posts)
  }

  async show({ params, response }: HttpContext) {
    const post = await Post.find(params.id)
    return response.ok(post)
  }

  async update({ request, params, response }: HttpContext) {
    const payload = await request.validateUsing(postValidator)
    const post = await Post.findOrFail(params.id)

    post.title = payload.title
    post.description = payload.description
    await post.save()

    return response.ok(post)
  }

  async destroy({ params, response }: HttpContext) {
    const post = await Post.findOrFail(params.id)
    await post.delete()

    return response.noContent()
  }
}
