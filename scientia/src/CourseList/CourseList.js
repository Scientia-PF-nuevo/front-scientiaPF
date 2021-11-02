import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import CourseCard from '../components/CourseCard/CourseCard'
import './CourseList.css'
import Pagination from '../components/Pagination/Pagination'
import noEncontrado from '../../src/assets/ahahah.gif'

function CourseList({ courses}) {

  const [currentPage, setCurrentPage] = useState(1)

  const [cardPerPage] = useState(5)

  //* indices de la paginación:
  const indexOfLastCard = currentPage * cardPerPage
  const indexOfFirstCard = indexOfLastCard - cardPerPage;

  var currentCards; //"cards" que se deben mostrar en la pantalla

  // en caso de que al buscar un juego en particular no encuentra ninguno
  if(typeof courses === 'string'){
      currentCards = courses
  }else {
      currentCards = courses.slice(indexOfFirstCard, indexOfLastCard) //uso los indices para "fraccionar que juegos muestro"
  }

  const paginate = (pageNumber) => {
       setCurrentPage(pageNumber)
  }

  if (courses.length === 1) {
    var arrCourse = []
    arrCourse.push(courses)
  }

  return (
    <div className="div-wrapper-course-list">
    <div className="div-container-course-list">

   { typeof currentCards === "string" || currentCards.length === 0? (
    <div className="not-found-course">
      <img src={noEncontrado}></img>
    </div>
  ) : 
    
  typeof currentCards !== "undefined" && currentCards.length >= 1 ? (
    currentCards.map((course) => (
      <CourseCard
        key={course.id}
        id={course.id}
        name={course.name}
        score={course.score}
        date={course.date}
        price={course.price}
        url={course.url}
        categories={course.categories}
        description={course.description}
        language={course.language}
        level={course.level}
        solds={course.solds}
        numbersOfDiscounts={course.numbersOfDiscounts}
        percentageDiscount={course.percentageDiscount}
      />
    ))
  ) 
  
  : (
    <div>
      <h1>Cargando...</h1>
    </div>
  )}
    </div>    
  <Pagination
          cardPerPage={cardPerPage}
          totalCards={courses.length}
          paginate={paginate}
          currentPage={currentPage}
        />
  </div>
  )
}

const mapStateToProps = (state) => {
    return {
        courses: state.rootReducer.allCourses,
    }
}

export default connect(mapStateToProps, null)(CourseList)
