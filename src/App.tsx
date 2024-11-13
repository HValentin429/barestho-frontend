import { BrowserRouter, Route, Router } from 'react-router-dom'
import './App.css'
import PublicRoutes from './routes/PublicRoutes'
import useResponsive from './features/hooks/useReponsive'

function App() {

  useResponsive();

  return (
    <BrowserRouter>
      <PublicRoutes/>
    </BrowserRouter>
  )
}

export default App
