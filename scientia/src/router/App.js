import React from 'react';
import './App.css';

// Router
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Components
import Home from '../components/Home/Home';
import About from '../components/About/About';
import Nav from '../components/Nav/Nav';
import Footer from '../components/Footer/Footer';
import Cart from '../components/Cart/Cart';
import Form from '../components/Form/Form';
import SignUp from '../components/SignUp/SignUp';
import Success from '../components/SignUp/Success';

function App() {
  return (
    <Router>
      <Nav />

      <Route exact path='/home'>
        <Home />
      </Route>

      <Route exact path='/about'>
        <About />
      </Route>

      <Route exact path='/cart'>
        <Cart />
      </Route>

      <Route exact path='/form' component={Form}/>

      <Route exact path='/signup'>
        <SignUp />
      </Route>

      <Route exact path='/signup/success'>
        <Success />
      </Route>

      <Footer />
    </Router>
  );
}

export default App;
