import {useLocation} from 'react-router-dom'
import './App.css';
import Layout from './layouts/index.jsx'
import Main from './pages/Main'
import Login from './pages/Login'

function App() {
  const {pathname} = useLocation()
  return (
    <div className="App">
      {
        pathname === '/login' 
        ? <Login/>
        : <>
            <Layout />
            <Main />
          </> 
      }
    </div>
  );
}

export default App;
