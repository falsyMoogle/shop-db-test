import React from 'react';
import {
  Route,
  Switch,
  withRouter,
  Redirect
} from "react-router-dom";
import { ItemsState } from './contexts/ItemsContext/ItemsState';
import { AuthProvider } from './contexts/AuthContext/Auth';
import PrivateRoute from './Routes/PrivateRoute';

import NavBar from './components/Navigation/NavBar';
import AddItemPage from './pages/AddItemPage';
import ItemsListPage from './pages/ItemsListpage';
import LoginPage from './pages/LoginPage';


function App(props) {
  const { history } = props;

  return (
    <div className="App">
      <AuthProvider>
        <NavBar history={history} />
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route history={history} path='/login' component={LoginPage} />
          <ItemsState>
            <PrivateRoute history={history} path='/additems' component={AddItemPage} />
            <PrivateRoute history={history} path='/itemslist' component={ItemsListPage} />
          </ItemsState>
        </Switch>
      </AuthProvider>
    </div>
  );
}

export default withRouter(App);
