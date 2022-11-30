import { ConnectionContext } from '../context'
import { useContext, React } from 'react'
import Mint from '../Components/Mint'



export default function Home() {

  const [connected, setConnected, provider, , address, setAddress, isChainCorrect] = useContext(ConnectionContext)

  if (connected) {
    return (
      <div className="App text">
        <Mint/>
      </div>
    )
  }
}
