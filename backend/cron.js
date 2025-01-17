import fetchCryptoData from './services/crypto.service.js';
import cron from 'node-cron';

export async function startJob() {
    const now = new Date();
    console.log('Running fetchCryptoData job immediately at:', now.toISOString());

    try {
        await fetchCryptoData();
        console.log('Data fetched and saved successfully.');
    } catch (error) {
        console.error('Error during fetchCryptoData execution:', error.message);
    }
}

export function scheduleJob() {
    cron.schedule('0 */2 * * *', async () => {
        const now = new Date();
        console.log('Running scheduled fetchCryptoData job at:', now.toISOString());

        try {
            await fetchCryptoData();
            console.log('Data fetched and saved successfully.');
        } catch (error) {
            console.error('Error during scheduled fetchCryptoData execution:', error.message);
        }
    });
}