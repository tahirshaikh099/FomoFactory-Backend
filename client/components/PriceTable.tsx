import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { fetchPrices } from '../store/pricesSlice';

const PriceTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const symbol = useSelector((state: RootState) => state.symbol);
  const { prices, status, error } = useSelector((state: RootState) => state.prices);

  useEffect(() => {
    dispatch(fetchPrices(symbol));
    const interval = setInterval(() => {
      dispatch(fetchPrices(symbol));
    }, 60000);
    return () => clearInterval(interval);
  }, [dispatch, symbol]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>{error}</p>;
  }

  return (
    <table className="price-table">
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

export default PriceTable;
