import { Events } from 'discord.js';
import { DateTime } from 'luxon';

export function newYearMessage(client) {
    const channelId = '1226877403117256746';
    // Exemple : date/heure locales de Belgique (Europe/Brussels)
    // 2026-01-01 00:00:00
    const targetLocalISO = '2025-12-18T14:26:00';
    const BRUSSELS_ZONE = 'Europe/Brussels';
    // Convertit l'heure locale de Bruxelles en UTC pour une comparaison fiable
    const targetUtc = DateTime.fromISO(targetLocalISO, { zone: BRUSSELS_ZONE }).toUTC();
    let hasSent = false;

    const checkAndSendMessage = () => {
        const nowUtc = DateTime.utc();
        const nowBrussels = nowUtc.setZone(BRUSSELS_ZONE);
        const targetBrussels = targetUtc.setZone(BRUSSELS_ZONE);
        console.log(
            `Vérification (Bruxelles) : maintenant = ${nowBrussels.toFormat('yyyy-LL-dd HH:mm:ss ZZZ')}, ` +
            `cible = ${targetBrussels.toFormat('yyyy-LL-dd HH:mm:ss ZZZ')}`
        );
        
        if (!hasSent && nowUtc.toMillis() >= targetUtc.toMillis()) {
            const channel = client.channels.cache.get(channelId);
            
            if (channel && channel.isTextBased()) {
                const currentYear = new Date().getFullYear();
                channel.send(`🎉 Bonne année ${currentYear} à tous ! Que cette nouvelle année soit remplie de joie, de succès et de moments inoubliables ! 🎉`);
                hasSent = true;
            } else {
                console.error('Canal introuvable ou non textuel');
            }
        }
    };

    // Vérifie toutes les minutes
    client.on(Events.ClientReady, () => {
        console.log(`Bot prêt - Vérification de la date programmée (zone ${BRUSSELS_ZONE})`);
        setInterval(checkAndSendMessage, 1000); // Vérifie chaque seconde
    });
}