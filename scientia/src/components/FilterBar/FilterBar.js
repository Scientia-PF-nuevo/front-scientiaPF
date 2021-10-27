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
            {/* <select  className="selectCont" onChange={handleSelect} name="" id="">
                <option className="option" value="default">CATEGORIES</option>         
                <optgroup className="optionGroup" label="Select...">
                     {coursesByGenre && coursesByGenre.map(g => <option key={g.name} value={g.name}>{g.name.toUpperCase()}</option>)}
                </optgroup>
            </select> */}
            <select  className="selectCont" onChange={handleSelect2} name="" id="">
                {/* <option className="option" value="default">ORDER...</option> */}
                    <option className="option" value="desc">MOST CHEAPER</option>
                    <option className="option" value="asc">MOST EXPENSIVE</option>
                    <option className="option" value="A-Z">A - Z</option>
                    <option className="option" value="Z-A">Z - A</option>
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