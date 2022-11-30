import { useContext, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { ConnectionContext, ContractContext } from '../context'
import { ethers } from 'ethers'
import { useState } from 'react'
import Link from 'next/link'


const Mint = () => {

    const [NFTABI, NFTAddress] = useContext(ContractContext)
    const [connected, setConnected, provider, , address, setAddress, isChainCorrect] = useContext(ConnectionContext)
    const [entered, setEntered] = useState()
    const [accounts, setAccounts] = useState([])
    const [data, setData] = useState({})
    const [loader, setLoader] = useState(true);
    

    useEffect(() => {
        setLoader(false);
         fetchData()
       }, [accounts[0]])

       async function fetchData() {
        if (typeof window.ethereum !== 'undefined') {
            const contract = new ethers.Contract(NFTAddress, NFTABI.abi, provider);
            try {
                
                const priceSale = await contract.priceSale();
                console.log(priceSale)
                const object = {
                  "priceSale": String(priceSale),
                }
                setData(object);
            }
            catch (err) {
                console.log(err);
            }
        }
    }



    async function enter(e) {
        e.target.innerHTML = 'Please wait!'
        var body = new FormData();
        body.append('address', ethers.utils.getAddress(address))
        console.log(address)
        var contract = new ethers.Contract(NFTAddress, NFTABI.abi, provider.getSigner())
        let overrides = {
            from: accounts[0],
            value: (data.priceSale * 1).toString()
        }
        var tx = await contract.enter(overrides)
        e.target.innerHTML = "Minting NFT and Parts!"
        await tx.wait()
        setEntered(true)
    }
        

    
    
    if (!entered) {
        return (
            <>
                <div>
                    <div>
                        <img className='randomEggHolder' style={{ position: 'relative' }} src='Assets/Images/starterPack.png' />
                    </div>
                    <Button onClick={(e) => enter(e)} className='mintBtn'>Enter!</Button>
                </div>
                <div>
                    cost : {String(data.priceSale/10**18)}
                </div>
            </>
        );
    }
    else {
        return (
            <div>
                <Link href="Claim">
                <Button style={{marginTop:'20px',padding:'10px'}} className='pinkBtn'>
                    Claim your NFT!
                </Button>
                </Link>
            </div>
        );
    }
}

export default Mint