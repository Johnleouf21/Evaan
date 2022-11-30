import React from 'react'
import { useContext } from 'react'
import { ButtonGroup, ToggleButton } from 'react-bootstrap'
import Link from 'next/link'
import { ConnectionContext } from '../context'


const Body = () => {

    const [connected, setConnected, provider, , address, setAddress, isChainCorrect] = useContext(ConnectionContext)

    if (!connected) {
        if (isChainCorrect === null) {
            return (
                <div className='text bodyDiv'>
                    <img width={400} src='Assets/Images/banner_image_min.png' />
                    <h2 className='bodyText'>Buy your entry!</h2>
                </div>
            )
        } else if (isChainCorrect === false) {
            return (<h1 className='text'>Incorrect Chain!</h1>);
        }
    }
    else if (connected) {
        return (
            <div>
                <ButtonGroup style={{marginBottom:'10px'}}>
                    <Link href='/'>
                        <ToggleButton style={{margin: '5px'}}>Mint</ToggleButton>
                    </Link>
                    <Link href='Claim'>
                        <ToggleButton style={{margin: '5px'}}>Claim your NFT</ToggleButton>
                    </Link>
                </ButtonGroup>
            </div>
        );
    }
}

export default Body