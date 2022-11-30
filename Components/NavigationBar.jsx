import Button from 'react-bootstrap/Button'
import React from 'react'
import { ethers } from 'ethers'
import Navbar from 'react-bootstrap/Navbar'
import { useContext, useState } from 'react'
import { ConnectionContext } from '../context'

const NavigationBar = () => {

  const [error, setError] = useState();
    // polygon mumbai
    const correctChain = '0x13881'
    // ganache testing
    // const correctChain = '0x1691'

    const [connected, setConnected, , setProvider, , setAddress, , setIsChainCorrect] = useContext(ConnectionContext)
    async function connect() {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const account = await provider.send('eth_requestAccounts', [])
        if (account.length > 0) {
            chainCheck(account,provider)
        }        
    }
    
    async function disconnect() {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const account = await provider.send('eth_requestAccounts', [])
        if (account.length > 0) {
            chainCheck2(account,provider)
        }        
    }

    async function chainCheck(account,provider) {
        var chain = await window.ethereum.request({ method: 'eth_chainId' })
        console.log(chain)
        if (chain === correctChain) {
            
            setIsChainCorrect(true)
            setConnected(true)
            setProvider(provider)
            setAddress(account[0]);
        }
        else {
            setIsChainCorrect(false)
        }
    }

    async function chainCheck2() {
        setConnected(false)
    }

    const changeNetwork = async ({ networkName, setError }) => {
        try {
          if (!window.ethereum) throw new Error("No crypto wallet found");
          await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${Number(80001).toString(16)}` }],
          });
        } catch (switchError) {
          // This error code indicates that the chain has not been added to MetaMask.
          if (switchError.code === 4902) {
            try {
              await ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    ...networks[networkName]
                  }
                ],
              });
            } catch (addError) {
              setError(err.message);
            }
          }
        }
      }

    const handleNetworkSwitch = async (networkName) => {
        setError();
        await changeNetwork({ networkName, setError });
        
      };

    async function connecter() {
        await handleNetworkSwitch("mumbai");
        await connect()
  
    }

    return (
        <Navbar className='navbarMain text'>
            <Navbar.Brand>
                <img alt="" className='navLogo' src='Assets/Images/logo-min.png' />
            </Navbar.Brand>
            <Navbar.Collapse className='justify-content-end'>
                {connected ? (
                    <Button onClick={disconnect} className='navConnectBtn2'>Connected</Button>
                    ) : (
                    <Button onClick={connecter} className='navConnectBtn'>Connect Wallet</Button> 
                )}
            </Navbar.Collapse>
        </Navbar>
    )   
}

export default NavigationBar