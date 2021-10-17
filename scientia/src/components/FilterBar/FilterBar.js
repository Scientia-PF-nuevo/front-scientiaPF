import React from 'react'
import { connect } from 'react-redux'
import { orderBy, filterBy } from '../../actions/actions'
import './FilterBar.css'

function FilterBy({orderBy, filterBy, coursesByGenre}) {

    const handleSelect = (e) => {
        filterBy(e.target.value)
    }

    const handleSelect2 = (e) => {
        orderBy(e.target.value)
    }
    return (
        <div className='container-div'>
            <select  className="selectCont" onChange={handleSelect} name="" id="">
                <option className="option" value="default">FILTER BY...</option>         
                <optgroup className="optionGroup" label="CATEGORIES">
                     {coursesByGenre && coursesByGenre.map(g => <option key={g.name} value={g.name}>{g.name.toUpperCase()}</option>)}
                </optgroup>
            </select>
            <select  className="selectCont" onChange={handleSelect2} name="" id="">
                <option className="option" value="default">ORDER BY...</option>
                <optgroup className="optionGroup" label="Price">
                    <option className="option" value="asc">EXPENSIVE</option>
                    <option className="option" value="desc">CHEAPER</option>
                </optgroup>               
                <optgroup className="optionGroup" label="Alphabetic">
                    <option className="option" value="A-Z">A - Z</option>
                    <option className="option" value="Z-A">Z - A</option>
                </optgroup>
                <optgroup className="optionGroup" label="ReleaseDate">
                    <option className="option" value="new">NEWEST</option>
                    <option className="option" value="old">OLDDER</option>
                </optgroup>
                <optgroup className="optionGroup" label="Rating">
                    <option className="option" value="best">BEST FIRST</option>
                    <option className="option" value="worst">WORST FIRST</option>
                </optgroup>
            </select>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {

        coursesByGenre: state.rootReducer.coursesByGenre
    }
}

export default connect(mapStateToProps, {orderBy, filterBy})(FilterBy)