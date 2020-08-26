import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext/Auth';
import firebase from '../../services/firebase';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SideBar from '../Navigation/SideBar';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
});

export default function NavBar({ history }) {
  const classes = useStyles();

  const { currentUser, setCurrentUser, setUserInfo } = useContext(AuthContext);

  const handleSignOut = () => {
    setCurrentUser(null)
    setUserInfo(null)
    firebase.auth().signOut();
  }



  return (
    <div className={ classes.root }>
      <AppBar position="fixed">
        <Toolbar>
          { currentUser ? <SideBar /> : null }
          <Typography variant="h6" className={ classes.title }>
            Shop-DB
          </Typography>
          { currentUser != null ?
            <>
              <Typography>
                <small>{ currentUser.email }</small>
              </Typography>
              <Button
                color="inherit"
                onClick={ handleSignOut }
              >
                Sign Out
              </Button>
            </>
            : null }
        </Toolbar>
      </AppBar>
    </div>
  );
}

