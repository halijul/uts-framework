import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch,
    Redirect,
  } from "react-router-dom";
 
  export default function Barangnya() {
      return (
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/oli">Oli</Link>
              </li>
              
            </ul>
            <hr />
    
            <Switch>
              <Route path="/oli">
                <Oli />
              </Route>
            </Switch>
          </div>
        </Router>
      );
    }
    
    function Oli() {
      
      let {path, url} = useRouteMatch();
      return (
        <div>
          <h2>Macam- macam Oli</h2>
          <ul>
          <li>
              <Link to={`${url}/Harga 250.000`}>Shell Helix HX5</Link>
            </li>
            <li>
              <Link to={`${url}/Harga 300.000`}>Shell RX3</Link>
            </li>
            <li>
              <Link to={`${url}/Harga 400.000`}>Shell Helix HX7</Link>
            </li>
            <li>
              <Link to={`${url}/Harga 500.000`}>Shell Helix HX</Link>
            </li>
          </ul> 
          <Switch>
            <Route exact path={path}>
              <h3>Please select an item.</h3>
            </Route>
            <Route path={`${path}/:topicId`}>
              <Topic />
            </Route>
          </Switch>
        </div>
      );
    }

   
    
    function Topic() {
      let {topicId} = useParams();
    
      return (
        <div>
          <h3>{topicId}</h3>
        </div>
      );
    }