import React from 'react';
import { useDispatch } from 'react-redux';
import { setSymbol } from '../store/symbolSlice';

const SYMBOLS = ['BTC', 'GOOGL', 'ETH', 'SOL', 'XRP'];

const SymbolSelector: React.FC = () => {
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSymbol(event.target.value));
  };

  return (
    <select className="symbol-selector" onChange={handleChange}>
      {SYMBOLS.map((symbol) => (
        <option key={symbol} value={symbol}>
          {symbol}
        </option>
      ))}
    </select>
  );
};

export default SymbolSelector;
