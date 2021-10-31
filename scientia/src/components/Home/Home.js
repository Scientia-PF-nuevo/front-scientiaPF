import React, { useEffect } from "react";
import './Home.css';
import SearchBar from "../Search/SearchBar";
import CourseList from "../../CourseList/CourseList";
import { getAllCourses, getGenresCourses, getUsers,getUserInfo, getCart} from '../../actions/actions'
import { connect } from "react-redux";


export function Home({
  user,
  getUserInfo,
  getAllCourses,
  getGenresCourses,
  getUsers,
  getCart,
  login,
}) {
  useEffect(() => {
    getAllCourses();
    getGenresCourses();
    getUsers();
    getUserInfo(user.email);
    if (login) {
        getCart(user.email);
    }
  }, []);

  return (
    <>
      {/* <Carousel/> */}
      <SearchBar />
      <div className="home-container">
        <CourseList />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
    return {
        user: state.rootReducer.user,
        login: state.rootReducer.login
    }
}

export default connect(mapStateToProps, { getAllCourses, getGenresCourses, getUsers, getUserInfo, getCart })(Home)