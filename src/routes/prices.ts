import { Router } from 'express';
import axios from 'axios';
import { Price } from '../models/price';
import dotenv from 'dotenv';
dotenv.config();


const router = Router();

const SYMBOLS = ['BTC', 'GOOGL', 'ETH', 'SOL', 'XRP'];

const COINHeader = {
    'Accept': 'application/json',
    'X-CoinAPI-Key': `${process.env.COINAPIKEY}`
};

async function fetchAndStorePrices() {
    console.log("Polling for prices...");

    for (const symbol of SYMBOLS) {
        try {
            const response = await axios.get(`https://rest.coinapi.io/v1/exchangerate/${symbol}/USD`, { headers: COINHeader });
            const price = new Price({ symbol, price: response.data.rate });
            await price.save();
            console.log(`Saved price for ${symbol}: ${response.data.rate}`);
        } catch (error) {
            console.error(`Error fetching price for ${symbol}:`, error);
        }
    }
    // Schedule the next polling after the current one finishes
    setTimeout(fetchAndStorePrices, 864000); // 14 minutes and 24 seconds
}

// Initial call to start polling
fetchAndStorePrices();

router.get('/:symbol', async (req, res) => {
    const { symbol } = req.params;
    try {
        const prices = await Price.find({ symbol }).sort({ timestamp: -1 }).limit(20);
        res.status(200).json({ "status": "success", "data": prices });
    } catch (error) {
        res.status(500).json({ "status": "error", "message": 'Error fetching prices' });
    }
});

export default router;