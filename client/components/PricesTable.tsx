import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setPrices } from '../store';
import axios from 'axios';

const PricesTable: React.FC = () => {
    const dispatch = useDispatch();
    const prices = useSelector((state: RootState) => state.prices.prices);
    const symbol = useSelector((state: RootState) => state.prices.symbol);

    useEffect(() => {
        const fetchPrices = async () => {
            const response = await axios.get(`/api/prices/${symbol}`);
            dispatch(setPrices(response.data));
        };

        fetchPrices();
        const interval = setInterval(fetchPrices, 5000);

        return () => clearInterval(interval);
    }, [dispatch, symbol]);

    return (
        <table>
            <thead>
                <tr>
                    <th>Symbol</th>
                    <th>Price</th>
                    <th>Timestamp</th>
                </tr>
            </thead>
            <tbody>
                {prices.map((price) => (
                    <tr key={price.timestamp}>
                        <td>{price.symbol}</td>
                        <td>{price.price}</td>
                        <td>{new Date(price.timestamp).toLocaleString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default PricesTable;
