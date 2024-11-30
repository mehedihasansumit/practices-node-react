
import './App.css'
import Count from './components/Count'
import CountContextProvider from './contexts/CountContext'

function App() {

  return (
    <>
      <CountContextProvider>
        <Count />
      </CountContextProvider>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
