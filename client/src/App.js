import React from 'react';
import {Switch, Route, Redirect, BrowserRouter  as Router } from "react-router-dom";

import "materialize-css";

import {Navbar} from "./components/Navbar";
import {AdmUsers} from "./pages/AdmUsers";
import {CreateAdmUser} from "./pages/CreateAdmUser"
import {UpdateAdmUser} from "./pages/UpdateAdmUser"

export const App = () => {

  return (
            <Router>
              <Navbar />
              <div className="container">
                <Switch>
                  <Route path="/admUsers" exact>
                    <AdmUsers />
                  </Route>
                  <Route path="/create" exact>
                    <CreateAdmUser />
                  </Route>
                  <Route path="/update/:id">
                      <UpdateAdmUser />
                  </Route>
                  <Redirect to="/admUsers" />
                </Switch>
              </div>
            </Router>
  );
}


