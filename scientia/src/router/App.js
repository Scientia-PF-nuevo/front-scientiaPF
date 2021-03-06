import React from 'react';
// Router
import { BrowserRouter as Router, Route } from 'react-router-dom';
import About from '../components/About/About';
import Cart from '../components/Cart/Cart';
import Details from '../components/Details/Details';
import Footer from '../components/Footer/Footer';
import NewForm from '../components/NewForm/NewForm';
import NewForm2 from '../components/NewForm/NewForm2';
import NewForm3 from '../components/NewForm/NewForm3';
import NewForm4 from '../components/NewForm/NewForm4';
import NewForm5 from '../components/NewForm/NewForm5';
import NewFormLast from '../components/NewForm/NewFormLast';

// Components
import Home from '../components/Home/Home';
import Landing from '../components/Landing/Landing';
import Login from '../components/Login/Login.jsx';
import MyLearning from '../components/myLearning/myLearning';
import Navegacion from '../components/Nav/Nav';
import Payment from '../components/Payment/payment';
import ResponsivePlayer from '../components/Player/Player';
import AdminPanel from '../components/Profiles/AdminPanel/AdminPanel';
import UserPanel from '../components/Profiles/UserPanel/UserPanel';
import SignUp from '../components/SignUp/SignUp';
import { useSelector } from 'react-redux';
import './App.css';



function App() {
  const user = useSelector((state) => state.rootReducer.user)
  const isLogin = useSelector(state=>state.rootReducer.login)
  return (
    <div className='container-app'>

      <Router>

        <Navegacion />

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

        <Route exact path='/mylearning' component={isLogin === true ? MyLearning : Home }  />
     
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

        <Route exact path='/payment' component={isLogin === true ? Payment : Home } />
        
        <Route exact path='/addCourses_step_1' component={isLogin === true ? NewForm : Home} />

        <Route exact path='/addCourses_step_2' component={isLogin === true ? NewForm2 : Home} />

        <Route exact path='/addCourses_step_3' component={isLogin === true ? NewForm3 : Home} />

        <Route exact path='/addCourses_step_4' component={isLogin === true ? NewForm4 : Home} />

        <Route exact path='/addCourses_step_5' component={isLogin === true ? NewForm5 : Home} />

        <Route exact path='/addCourses_step_final' component={isLogin === true ? NewFormLast : Home} />

        <Route exact path='/userprofile' component={isLogin === true ? (user.isAdmin ? AdminPanel : UserPanel)  : Home} />
        
        <Footer />
      </Router>
    </div>
  );
}

export default App;
