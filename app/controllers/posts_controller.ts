import { HttpContext } from '@adonisjs/core/http'
import Post from '#models/post'
import { postValidator, updateValidator } from '#validators/post'

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
    const payload = await request.validateUsing(updateValidator)
    const post = await Post.findOrFail(params.id)

    if (payload.advice_id) {
      post.advice_id = payload.advice_id
    }
    if (payload.title) {
      post.title = payload.title
    }
    if (payload.description) {
      post.description = payload.description
    }
    if (payload.user_id) {
      post.user_id = payload.user_id
    }

    await post.save()

    return response.ok(post)
  }

  async destroy({ params, response }: HttpContext) {
    const post = await Post.findOrFail(params.id)
    await post.delete()

    return response.noContent()
  }

  async indexPostsNoAdvice({ response }: HttpContext) {
    const posts = await Post.query().whereNull('advice_id')
    return response.ok(posts)
  }
}
