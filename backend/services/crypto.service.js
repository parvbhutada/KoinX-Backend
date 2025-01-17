import axios from 'axios';
import Crypto from '../models/crypto.model.js';
import cron from 'node-cron';

async function fetchCryptoData() {
    const coins = ['bitcoin', 'matic-network', 'ethereum'];
    const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(',')}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`;

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'x-cg-pro-api-key': process.env.COINGECKO_API_KEY,
            },
        });

        const data = response.data;

        console.log("Fetched Cryptocurrency Data:");
        console.log(JSON.stringify(data, null, 2));

        for (const coin of coins) {
            const entry = new Crypto({
                coin: coin,
                price: data[coin].usd,
                marketCap: data[coin].usd_market_cap,
                change24h: data[coin].usd_24h_change,
            });

            await entry.save();
            console.log(`Data for ${coin} saved successfully`);
        }
    } catch (error) {
        console.error('Error fetching cryptocurrency data:', error.message);
    }
}

export default fetchCryptoData;