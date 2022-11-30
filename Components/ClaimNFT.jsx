import { useContext, useEffect } from 'react'
import { Button } from 'react-bootstrap/Button'
import { ConnectionContext, ContractContext } from '../context'
import { ethers } from 'ethers'
import { useState } from 'react'
import Link from 'next/link'
import { ButtonGroup } from 'react-bootstrap'


const ClaimNFT = () => {

    const [NFTABI, NFTAddress] = useContext(ContractContext)
    const [connected, setConnected, provider, , address, setAddress, isChainCorrect] = useContext(ConnectionContext)
    const [entered, setEntered] = useState()
    const [accounts, setAccounts] = useState([])
    const [data, setData] = useState({})
    const [loader, setLoader] = useState(true);

    

    useEffect(() => {
        setLoader(false);
        fetchData();
       }, [address])

    async function fetchData() {
        if (typeof window.ethereum !== 'undefined') {
            const contract = new ethers.Contract(NFTAddress, NFTABI.abi, provider);
            try {
                
                const priceSale = await contract.priceSale();
                const balanceOfUnique = await contract.balanceOf(address, 1);
                const balanceOfRare = await contract.balanceOf(address, 2);
                const balanceOfLimited = await contract.balanceOf(address, 3);
                console.log(priceSale)
                console.log(balanceOfUnique)
                console.log(balanceOfRare)
                console.log(balanceOfLimited)
                const object = {
                  "priceSale": String(priceSale),
                  "balanceOfUnique": String(balanceOfUnique),
                  "balanceOfRare": String(balanceOfRare),
                  "balanceOfLimited": String(balanceOfLimited),
                }
                setData(object);
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    async function pickWinnerUnique() {
        if (typeof window.ethereum !== 'undefined') {
            const contract = new ethers.Contract(NFTAddress, NFTABI.abi, provider);
            try {
                var tx = await contract.pickWinner(1)
                await tx.wait()
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    async function pickWinnerRare() {
        if (typeof window.ethereum !== 'undefined') {
            const contract = new ethers.Contract(NFTAddress, NFTABI.abi, provider);
            try {
                var tx = await contract.pickWinner(2)
                await tx.wait()
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    async function pickWinnerLimited() {
        if (typeof window.ethereum !== 'undefined') {
            const contract = new ethers.Contract(NFTAddress, NFTABI.abi, provider);
            try {
                var tx = await contract.pickWinner(3)
                await tx.wait()
            }
            catch (err) {
                console.log(err);
            }
        }
    }
    

        return (
        <>
            <div style={{ margin: '100px', color:'white'}}>
                <h2 style={{margin: '100px'}}>My NFT</h2>
                <div >
                    <div>UNIQUE {data.balanceOfUnique}
                        <div >
                        <img width={100} src='https://nfsquat.mypinata.cloud/ipfs/QmWsidemLgirGTwy8LxGxcpeC9uxxrkVjqqDF84DPA9AX3/unique.png'/>
                        </div>
                    </div>
                    <div>RARE {data.balanceOfRare}
                        <div>   
                        <img width={100} src='https://nfsquat.mypinata.cloud/ipfs/QmWsidemLgirGTwy8LxGxcpeC9uxxrkVjqqDF84DPA9AX3/rare.png'/>
                        </div>
                    </div>
                    <div>LIMITED {data.balanceOfLimited}
                        <div>   
                        <img width={100} src='https://nfsquat.mypinata.cloud/ipfs/QmWsidemLgirGTwy8LxGxcpeC9uxxrkVjqqDF84DPA9AX3/limited.png'/>
                        </div>
                    </div>
                </div>
                <button onClick={pickWinnerUnique} className='mintBtn'>Pick a Winner for the UNIQUE!</button>
                <button onClick={pickWinnerRare} className='mintBtn'>Pick a Winner for the RARE!</button>
                <button onClick={pickWinnerLimited} className='mintBtn'>Pick a Winner for the LIMITED!</button>   
            </div> 
        </>
        );
    
}

export default ClaimNFT;