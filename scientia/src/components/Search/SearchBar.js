import {React, useState} from 'react'
import { connect } from 'react-redux'
import FilterBar from '../FilterBar/FilterBar'
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
      <div className="wrapper">
        <input
          className="search"
          name="buscar"
          placeholder="Search by name..."
          onChange={handleInputChange}
          value={input.buscar}
          autoComplete="off"
        ></input>
        <button className="search-icon" onClick={handleOnClick}>
          Search
        </button>
        <button className="search-icon" onClick={() => getAllCourses()}>
          Reset
        </button>
        <FilterBar/>
      </div>
    );
}

export default connect(null, { searchByName, getAllCourses })(SearchBar)