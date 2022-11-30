import { createContext, useContext, useState, useEffect } from 'react';
import NFTABI from '../artifacts/contracts/Lottery.sol/Lottery.json'

const ConnectionContext = createContext({});
const ContractContext = createContext({});

const Provider = ({ children }) => {
    const [connected, setConnected] = useState(false)
    const [provider, setProvider] = useState(null)
    const [address, setAddress] = useState(null)
    const [isChainCorrect,setIsChainCorrect] = useState(null)
    const value = [connected, setConnected, provider, setProvider, address, setAddress, isChainCorrect, setIsChainCorrect]

    return <ConnectionContext.Provider value={value}>{children}</ConnectionContext.Provider>;
};

export { ConnectionContext, Provider };

const Contract = ({ children }) => {
    const NFTAddress = '0xe9517A1dEe2E94fA14022ff764C2Bdba79cC67a3'

    const value = [NFTABI, NFTAddress]

    return <ContractContext.Provider value={value}>{children}</ContractContext.Provider>;
};

export { ContractContext, Contract };
