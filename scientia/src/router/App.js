import React from 'react';
// Router
import { BrowserRouter as Router, Route } from 'react-router-dom';
import About from '../components/About/About';
import Cart from '../components/Cart/Cart';
import Details from '../components/Details/Details';
import Footer from '../components/Footer/Footer';
import Form from '../components/Form/Form';
// Components
import Home from '../components/Home/Home';
import Landing from '../components/Landing/Landing';
import Login from '../components/Login/Login.jsx';
import MyLearning from '../components/myLearning/myLearning';
import Nav from '../components/Nav/Nav';
import Payment from '../components/Payment/payment';
import ResponsivePlayer from '../components/Player/Player';
import AdminPanel from '../components/Profiles/AdminPanel/AdminPanel';
import UserPanel from '../components/Profiles/UserPanel/UserPanel';
import SignUp from '../components/SignUp/SignUp';
import Success from '../components/SignUp/Success';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import './App.css';



function App() {
  const user = useSelector((state) => state.rootReducer.user)
  return (
    <div className='container-app'>

      <Router>

        <Nav />

        <Route exact path='/'>
          <Landing />
        </Route>

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

        <Route exact path='/form' component={Form} />

        <Route path='/userprofile'>
          {user.isAdmin ? <Redirect to="/adminprofile" /> : <UserPanel />}
        </Route>

        <Route path='/adminprofile'>
          {user.isAdmin ? <AdminPanel /> : <Redirect to="/" />}
        </Route>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
