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
import Success from '../components/SignUp/Success';
import ResponsivePlayer from '../components/Player/Player';
import Sidebar from '../components/Profiles/UserPanel/UserPanel';
import Dashboard from '../components/Profiles/UserPanel/Dashboard/Dashboard';
import MyCourses from '../components/Profiles/UserPanel/MyCourses/MyCourses';
import MyFavorites from '../components/Profiles/UserPanel/MyFavorites/MyFavorites';

function App() {
  return (
    <div className='container-app'>

    <Router>
      
      <Nav />

      <Route exact path='/login'>
        <Login />
      </Route>

      <Route exact path='/signup'>
        <SignUp />
      </Route>

      <Route exact path='/player'>
        <ResponsivePlayer />
      </Route>

      <Route exact path='/mylearning'>
        <MyLearning />
      </Route>
    
      <Route exact path='/success'>
        <Success />
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

      <div className="div-app">
        <Route path='/userprofile'>
          <Sidebar />
        </Route>

        <Route exact path='/userprofile'>
          <Dashboard />
        </Route>

        <Route exact path='/userprofile/mycourses'>
          <MyCourses />
        </Route>

        <Route exact path='/userprofile/myfavorites'>
          <MyFavorites />
        </Route>
      </div>

      <Footer />
    </Router>
    </div>
  );
}

export default App;
