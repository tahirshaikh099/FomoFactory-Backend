import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSymbol } from '../store';

const SymbolModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [newSymbol, setNewSymbol] = useState('');
    const dispatch = useDispatch();

    const handleSave = () => {
        dispatch(setSymbol(newSymbol));
        setIsOpen(false);
    };

    return (
        <>
            <button onClick={() => setIsOpen(true)}>Change Symbol</button>
            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Change Symbol</h2>
                        <input
                            type="text"
                            value={newSymbol}
                            onChange={(e) => setNewSymbol(e.target.value)}
                        />
                        <button onClick={handleSave}>Save</button>
                        <button onClick={() => setIsOpen(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default SymbolModal;
