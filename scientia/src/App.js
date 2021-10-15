import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import About from './components/About/About';
import Home from './components/Home/Home';
import SignUp from "./components/SignUp/SignUp";

function App() {
  return (
      <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path='/about' component={About} />
            <Route exact path='/signup' component={SignUp} />
            <Route path='*' component={Page404} />
          </Switch>
      </Router>
  );
}

export default App;