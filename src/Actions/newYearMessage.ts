import { Events } from 'discord.js';

export function newYearMessage(client) {
    const channelId = '1226877403117256746'; // Remplacez par l'ID de votre canal
    const targetDate = new Date('2025-12-18T13:40:00'); // Date et heure cibles

    const checkAndSendMessage = () => {
        const now = new Date();
        
        if (now >= targetDate) {
            const channel = client.channels.cache.get(channelId);
            
            if (channel && channel.isTextBased()) {
                const currentYear = new Date().getFullYear();
                channel.send(`🎉 Bonne année ${currentYear} à tous ! Que cette nouvelle année soit remplie de joie, de succès et de moments inoubliables ! 🎉`);
            } else {
                console.error('Canal introuvable ou non textuel');
            }
        }
    };

    // Vérifie toutes les minutes
    client.on(Events.ClientReady, () => {
        console.log('Bot prêt - Vérification de la date programmée en cours');
        setInterval(checkAndSendMessage, 60 * 1000); // Vérifie chaque minute
    });
}