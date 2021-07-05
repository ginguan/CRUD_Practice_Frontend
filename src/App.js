import './App.css';
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import AddShow from "./components/add-show.component";
import Show from "./components/show.component";
import ShowsList from "./components/shows-list.component";

function App() {
  return (
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/shows"} className="navbar-brand" style={{marginLeft:"55px"}}>
            Home
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/shows"} className="nav-link">
                Shows-List
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add-Show
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          {/*Each Route points to a React Component.*/}
          <Switch>
            <Route exact path={["/", "/shows"]} component={ShowsList} />
            <Route exact path="/add" component={AddShow} />
            <Route path="/shows/:id" component={Show} />
          </Switch>
        </div>
      </Router>
  );
}

export default App;
