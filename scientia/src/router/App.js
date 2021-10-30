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
import UserPanel from '../components/Profiles/UserPanel/UserPanel';
import AdminPanel from '../components/Profiles/AdminPanel/AdminPanel';
import Payment from '../components/Payment/payment';
import PassCourses from '../components/PassCourse/PassCourses';

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

      <Route exact path='/payment'>
        <Payment />
      </Route>

      <Route exact path='/form' component={Form}/>

      <Route path='/userprofile'>
        <UserPanel />
      </Route>

      <Route path='/adminprofile'>
        <AdminPanel />
      </Route>

            
      <Route path='/passCourses'>
        <PassCourses />
      </Route>
      
      <Footer />
    </Router>
    </div>
  );
}

export default App;
