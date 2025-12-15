import { Events } from 'discord.js';

export function catchReactions(client) {

client.on(Events.MessageReactionAdd, async (reaction, user) => {
    // Si la réaction est partielle, la récupérer complètement
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            console.error('Erreur lors de la récupération de la réaction:', error);
            return;
        }
    }
    
    console.log(`${user.tag} a réagi avec ${reaction.emoji.name}`);
    
    // Ignorer les réactions des bots
    //if (user.bot) return;
    
    // Exemple : réagir à une réaction spécifique
    switch (reaction.emoji.name) {
        case '🫦':
            reaction.message.channel.send(`${user} a l'aire d'aimé ça 👀 👀 👀`);
            break;
        case '😴':
            reaction.message.channel.send(`${user.tag} fait une sieste 😴... Zzzzzzz`);
            break;
        case '🔥':
            reaction.message.channel.send(`${user.tag} a mis le feu 🔥🔥🔥`);
            break;
        case '👍':
            reaction.message.channel.send(`${user.tag} approuve ce message 👍`);
            break;
        case '😂':
            reaction.message.channel.send(`${user.tag} trouve ça hilarant 😂`);
            break;
        default:
            reaction.message.channel.send(`${user.tag} a réagi avec ${reaction.emoji.name}`);
            break;
    }
});

// Quand une réaction est retirée
client.on(Events.MessageReactionRemove, async (reaction, user) => {
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            console.error('Erreur lors de la récupération de la réaction:', error);
            return;
        }
    }
    
    console.log(`${user.tag} a retiré sa réaction ${reaction.emoji.name}`);
});

// Quand toutes les réactions d'un message sont retirées
client.on(Events.MessageReactionRemoveAll, async (message) => {
    console.log('Toutes les réactions ont été retirées du message');
});

// Quand toutes les réactions d'un emoji spécifique sont retirées
client.on(Events.MessageReactionRemoveEmoji, async (reaction) => {
    console.log(`Toutes les réactions ${reaction.emoji.name} ont été retirées`);
});

}