import React, { useState, useEffect, useContext } from 'react';
import firebaseApp from '../firebase.js';
import { Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Route, Switch ,useHistory} from 'react-router-dom'
import { AuthContext } from "components/Auth/Auth.js";
import allmember from "views/all_member_admin.js";
import profile from "views/profile_member_admin.js";
import { createBrowserHistory } from "history";

const Member = () => {

 
  const hist = createBrowserHistory();

  const { currentUser } = useContext(AuthContext);


  if (currentUser) {
      return <Redirect to="/member/profile" />;
  }
  
    return (
      <>
            <Router history={hist}>
              <Switch>               
                <Route path="/admin/member/profile" component={profile} />
                <Route path="/admin/member" component={allmember} />
              </Switch>
            </Router>
      </>
    );

}

export default Member;
