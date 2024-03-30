import axios from 'axios'

export const getTestBNBUSDTUSDCRate = async () => {
    try {
        let res = await axios.get('https://testnet.binance.vision/api/v3/avgPrice?symbol=BNBUSDT');

        return res.data.price;
    } catch(err) {
        console.log(err);
    }
}

export const getTestBNBETHRate = async () => {
    try {
        let res = await axios.get('https://testnet.binance.vision/api/v3/avgPrice?symbol=ETHUSDT');

        return res.data.price;
    } catch(err) {
        console.log(err)
    }
}