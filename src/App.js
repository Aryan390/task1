import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home/Home.js'
import Login from './pages/Login/Login'

import './App.css';
import { useContext } from 'react/cjs/react.development';
import AuthContext from './store/auth-context.js';

function App() {
  const authCtx = useContext(AuthContext)

  return (
    <Switch>
      {!authCtx.isLoggedIn && 
        <Route path='/login'>
          <Login />
        </Route>
      }
      <Route path='/'>
          {authCtx.isLoggedIn && <Home />}
          {!authCtx.isLoggedIn && <Redirect to='/login' />}
      </Route>
    </Switch>
  );
}

export default App;
