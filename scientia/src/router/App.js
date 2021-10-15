import React from 'react';
import './App.css';

// Router
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Components
import Home from '../components/Home/Home';
import About from '../components/About/About';
import Nav from '../components/Nav/Nav';
import Footer from '../components/Footer/Footer';
import Form from '../components/Form/Form';
import Cart from '../components/Cart/Cart';

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


      <Route exact path='/form' component={Form}/>

      <Route exact path='/cart'>
        <Cart />
      </Route>

      <Footer />
    </Router>
  );
}

export default App;
