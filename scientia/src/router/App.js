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
import Details from '../components/Details/Details';
import Login from '../components/Login/Login.jsx'
import SignUp from '../components/SignUp/SignUp';
import MyLearning from '../components/myLearning/myLearning';

function App() {
  return (
    <div className='container-app'>

    <Router>
      
      <Nav />

      <Route exact path='/'>
        <Login />
      </Route>

      <Route exact path='/signup'>
        <SignUp />
      </Route>

      <Route exact path='/mylearning'>
        <MyLearning />
      </Route>

      <Route exact path='/home'>
        <Home />
      </Route>

      <Route exact path='/about'>
        <About />
      </Route>

      <Route exact path='/cart'>
        <Cart />
      </Route>

      <Route exact path='/details'>
        <Details />
      </Route>

      <Route exact path='/form' component={Form}/>

      <Footer />
    </Router>
    </div>
  );
}

export default App;
