import {React, useState} from 'react'
import { connect } from 'react-redux'
import { searchByName, getAllCourses } from '../../actions/actions'
import './SearchBar.css'


function SearchBar({searchByName, getAllCourses}) {

    const [input, setInput] = useState({
        buscar: ''
    })

    const handleInputChange = function(e) {
          setInput({
          [e.target.name]: e.target.value
        });
    }

    const handleOnClick = () => {
        if ( input.buscar.length < 3 ) {
          return alert('ingrese mas de 3 digitos')
        }
        searchByName(input.buscar)
        setInput({
            buscar: ''
        });
    }

    return (
      <div className="searchbar-div">
        <input
          className="bar-btn"
          name="buscar"
          placeholder="buscá tu curso por nombre..."
          onChange={handleInputChange}
          value={input.buscar}
          autoComplete="off"
        ></input>
        <button className="btn" onClick={handleOnClick}>
          Buscar
        </button>
        <button className="btn" onClick={() => getAllCourses()}>
          Todos
        </button>
      </div>
    );
}

export default connect(null, { searchByName, getAllCourses })(SearchBar)