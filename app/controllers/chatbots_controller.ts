import type { HttpContext } from '@adonisjs/core/http'

export default class ChatbotController {
  async ask({ request, response }: HttpContext) {
    const { message } = request.only(['message'])

    if (!message || typeof message !== 'string') {
      return response.badRequest({ response: "Je n'ai pas compris votre message." })
    }

    const lowerMessage = message.toLowerCase().trim()

    const faq: { keywords: string[], reply: string }[] = [
      {
        keywords: ['comment', 'demander', 'avis', 'vétérinaire'],
        reply: "Pour demander l'avis d'un vétérinaire, commencez par enregistrer un animal dans votre compte. Ensuite, rendez-vous dans l'onglet 'Vos demandes', remplissez les informations nécessaires (nom de l’animal, symptômes, etc.) puis validez la demande. Un vétérinaire vous répondra rapidement."
      },
      {
        keywords: ['enregistrer', 'animal'],
        reply: "Vous pouvez enregistrer un animal depuis l'onglet 'Mon compte'. Cliquez sur 'Ajouter un animal' et remplissez les informations demandées."
      },
      {
        keywords: ['voir', 'mes', 'demandes'],
        reply: "Pour voir vos demandes, allez dans l’onglet 'Vos demandes'. Vous y trouverez la liste de vos demandes actuelles et passées."
      },
      {
        keywords: ['urgence'],
        reply: "En cas d'urgence, contactez immédiatement une clinique vétérinaire proche de chez vous. Ce service ne remplace pas une consultation d'urgence."
      },
      {
        keywords: ['connexion', 'inscription'],
        reply: "Vous pouvez vous inscrire ou vous connecter via les boutons en haut à droite du site. Une fois connecté, vous aurez accès à toutes les fonctionnalités."
      },
      {
        keywords: ['contact', 'vétérinaire'],
        reply: "Pour contacter un vétérinaire, vous devez d'abord créer une demande en lien avec un animal que vous avez enregistré."
      },
      {
        keywords: ['conseils', 'alimentation'],
        reply: "Une bonne alimentation est essentielle pour votre animal. Vous pouvez consulter nos conseils dans la rubrique dédiée ou demander l’avis d’un vétérinaire via une demande."
      },
    ]

    const found = faq.find(item =>
      item.keywords.some(keyword => lowerMessage.includes(keyword))
    )

    const reply = found
      ? found.reply
      : "Je ne suis pas sûr de comprendre. Essayez de poser une question sur : comment enregistrer un animal, créer une demande ou contacter un vétérinaire."

    return response.ok({ response: reply })
  }
}
