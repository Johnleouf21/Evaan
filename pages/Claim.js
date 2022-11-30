import ClaimNFT from "../Components/ClaimNFT"
import { ConnectionContext } from '../context'
import { useContext, React } from 'react'


export default function Claim() {

    const [connected, setConnected, provider, , address, setAddress, isChainCorrect] = useContext(ConnectionContext)

    if (connected) {
        return (
            <ClaimNFT/>
        )
    }
}