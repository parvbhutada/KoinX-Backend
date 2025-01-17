import Crypto from '../models/crypto.model.js';

export const statsController = async (req, res) => {
    const { coin } = req.query;

    if (!coin) {
        return res.status(400).json({ error: 'Coin is required' });
    }

    try {
        const latestData = await Crypto.findOne({ coin })
            .sort({ timestamp: -1 })
            .select('price marketCap change24h');  // Only fetch the required fields

        if (!latestData) {
            return res.status(404).json({ error: 'No data found for the requested coin' });
        }

        return res.status(200).json({
            price: latestData.price,
            marketCap: latestData.marketCap,
            change24h: latestData.change24h,
        });
    } catch (error) {
        console.error(error);  // Log the error for debugging
        return res.status(500).json({ error: 'An error occurred while fetching data' });
    }
};


export const deviationController = async (req, res) => {
    const { coin } = req.query;

    if (!coin) {
        return res.status(400).json({ error: 'Coin is required' });
    }

    const records = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);

    if (records.length === 0) {
        return res.status(404).json({ error: 'No data found for the requested coin' });
    }

    if (records.length < 2) {
        return res.status(400).json({ error: 'Not enough data to calculate deviation' });
    }

    const prices = records.map((record) => record.price);
    const mean = prices.reduce((acc, price) => acc + price, 0) / prices.length;
    const variance = prices.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) / (prices.length - 1);
    const deviation = Math.sqrt(variance);

    res.status(200).json({ deviation: deviation.toFixed(2) });
};