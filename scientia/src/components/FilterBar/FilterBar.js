import React from 'react'
import { connect } from 'react-redux'
import { orderBy, filterBy } from '../../actions/actions'
import './FilterBar.css'

function FilterBy({orderBy, filterBy, filteredCourses}) {

    const handleSelect = (e) => {
        filterBy(e.target.value)
    }

    const handleSelect2 = (e) => {
        orderBy(e.target.value)
    }
    return (
        <div className='container-div'>
            <select  className="selectCont" onChange={handleSelect} name="" id="">
                <option className="option" value="default">TODOS LOS CURSOS</option>
                <optgroup className="optionGroup" label="DataBase">
                    <option className="option" value="DB">CREADOS</option>
                </optgroup>
                <optgroup className="optionGroup" label="API">
                    <option className="option" value="API">API</option>
                </optgroup>              
                <optgroup className="optionGroup" label="GENRES">
                    {/* {filteredCourses && filteredCourses.map(g => <option key={g.name} value={g.name}>{g.name}</option>)} */} //TODO definir propiedades primero
                </optgroup>                
            </select>
            <select  className="selectCont" onChange={handleSelect2} name="" id="">
                <option className="option" value="default">ORDEN...</option>
                <optgroup className="optionGroup" label="Price">
                    <option className="option" value="asc">Expensive</option>
                    <option className="option" value="desc">Cheaper</option>
                </optgroup>               
                <optgroup className="optionGroup" label="Alphabetic">
                    <option className="option" value="A-Z">A - Z</option>
                    <option className="option" value="Z-A">Z - A</option>
                </optgroup>
                <optgroup className="optionGroup" label="ReleaseDate">
                    <option className="option" value="new">Mas Recientes</option>
                    <option className="option" value="old">Menos Recientes</option>
                </optgroup>
                <optgroup className="optionGroup" label="Rating">
                    <option className="option" value="best">Best First</option>
                    <option className="option" value="worst">Worst First</option>
                </optgroup>
            </select>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {

        filteredCourses: state.filteredCourses
    }
}

export default connect(mapStateToProps, {orderBy, filterBy})(FilterBy)