/*import type { HttpContext } from '@adonisjs/core/http'
import Animal from '#models/animal'
export default class AnimalsController {
    async show({response} : HttpContext){
        const getAllAnimals = await Animal.all()
        return response.json(getAllAnimals)
    }

    async store({request, response} : HttpContext){
        const {name, age, species} = request.body
    }
}*/

import { HttpContext } from "@adonisjs/core/http";
import { AnimalValidator } from "#validators/animal";
import app from '@adonisjs/core/services/app'
import Animal from "#models/animal";


export default class AnimalController {

    async store({request, response} : HttpContext){
        const uploadAnimal = await request.validateUsing(AnimalValidator)

        const newAnimal = await Animal.create({
            name: uploadAnimal.name,
            species: uploadAnimal.species,
            symptoms: uploadAnimal.symptoms,
            status: uploadAnimal.status

            
          })
        return response.created(newAnimal)
        
    };

    async destroy({request, response} : HttpContext){
        const {id} = request.params()
        const AnimalToRemove = await Animal.findByOrFail('id', id);
        await AnimalToRemove.delete()

        if(!response.ok){
            return response.status(400).json({message: 'This animal does not exist'})
        } 
        else {
            return response.ok({message : 'Deleted successfully'})
        }
    };
    
    async index({response} : HttpContext){
       const getAllAnimals = await Animal.all()
       return response.json(getAllAnimals)
    }
    

    async show({request, response} : HttpContext){
        const {id} = request.params()
        const animal = await Animal.findByOrFail('id', id)
        return response.json(animal)
    }

    /*async update({request, response} : HttpContext){

        //const editPost = await Post.findOrFail('id', id)
        const editPost = await request.validateUsing(updatePostValidator);
        const {id} = request.params()
        const post = await Post.findByOrFail('id', id)
        post.comments = editPost.comments
        post.likers = editPost.likers

        if(!response.ok){

            return response.status(400).json({message: 'Post does not exist'})

        } else {

            return response.json(post)
        }
    }*/
}
