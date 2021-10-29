
import {React, useState, useEffect} from 'react'
import { connect } from 'react-redux'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import MyFormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Rating from '@mui/material/Rating';
import { searchByName, getAllCourses, getFilteredCourses, orderBy } from '../../actions/actions'
import './SearchBar.css'


function SearchBar({coursesByGenre,allCourses, searchByName, getAllCourses, getFilteredCourses, orderBy}) {
  

  const [checked, setChecked] = useState({
    level1: false,
    level2: false,
    level3: false,
    price1: false,
    price2: false,
    price3: false,
    languaje1: false,
    languaje2: false,
    languaje3: false,
    ranking1: false,
    ranking2: false,
    ranking3: false,
    ranking4: false,
    ranking5: false,
    category: "all"
  });
  

  
  const handleChangeCheck = (event) => {
    setChecked({...checked, [event.target.name]: event.target.checked});
  };

  const handleChangeCategory = (event) => {
    setChecked({...checked, ["category"]: event.target.name});
  };
  
  useEffect(() => {
    getFilteredCourses(checked)
  }, [checked])
  
  const [expanded, setExpanded] = useState(false);

  
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  
  const [input, setInput] = useState({
        buscar: ''
    })

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true);



  const handleInputChange = function (e) {
    setInput({
      [e.target.name]: e.target.value
    });
  }

  const handleSelect2 = (e) => {
    orderBy(e.target.value)
}

  const handleOnClick = () => {
    if (input.buscar.length < 3) {
      return handleShow()
    }
    searchByName(input.buscar)
    setInput({
      buscar: ''
    });

  }
  const handleCleanFilters = () => {
    setChecked( {level1: false,
      level2: false,
      level3: false,
      price1: false,
      price2: false,
      price3: false,
      languaje1: false,
      languaje2: false,
      languaje3: false,
      ranking1: false,
      ranking2: false,
      ranking3: false,
      ranking4: false,
      ranking5: false,
      category: "all"} )
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
          SEARCH
        </button>
        <button className="search-icon" onClick={() => getAllCourses()}>
          ALL
        </button>
       
        <br></br>
        <h3>FILTER BY</h3>
        <br></br>

        <div>
          <Accordion
            expanded={expanded === "panel7"}
            onChange={handleChange("panel7")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                <strong>CATEGORIES</strong>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <RadioGroup name="" defaultValue="first">
                  <MyFormControlLabel
                    value="default"
                    label="ALL CATEGORIES"
                    control={<Radio checked={checked.category === "all" ? true : false} name="all" onChange={handleChangeCategory} />}
                  />
                  {coursesByGenre &&
                    coursesByGenre.map((g) => (
                      <MyFormControlLabel
                        value={g.name}
                        name={g.name}
                        key={g.name}
                        label={g.name.toUpperCase()}
                        control={<Radio name={g.name} checked={checked.category === g.name ? true : false} onChange={handleChangeCategory} />}
                      />
                    ))}
                </RadioGroup>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                <strong>LEVEL</strong>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox checked={checked.level1} name="level1" onClick={handleChangeCheck} />
                    }
                    label="BEGINNER"
                    value="beginner"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={checked.level2} name="level2" onClick={handleChangeCheck} />
                    }
                    label="MIDDLE"
                    value="middle"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={checked.level3} name="level3" onClick={handleChangeCheck} />
                    }
                    label="EXPERT"
                    value="expert"
                  />
                </FormGroup>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography>
                <strong>PRICE</strong>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox checked={checked.price1} name="price1" onChange={handleChangeCheck} />
                    }
                    label="FREE"
                    value="free"
                  />
                    <FormControlLabel
                    control={
                      <Checkbox checked={checked.price3} name="price3" onChange={handleChangeCheck} />
                    }
                    label="OFFERS"
                    value="offers"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={checked.price2} name="price2" onChange={handleChangeCheck} />
                    }
                    label="PAID"
                    value="paid"
                  />
                </FormGroup>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography>
                <strong>LANGUAJE</strong>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox checked={checked.languaje1} name="languaje1" onChange={handleChangeCheck} />
                    }
                    label="SPANISH"
                    value="spanish"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={checked.languaje2} name="languaje2" onChange={handleChangeCheck} />
                    }
                    label="ENGLISH"
                    value="english"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={checked.languaje3} name="languaje3" onChange={handleChangeCheck} />
                    }
                    label="OTHERS"
                    value="others"
                  />
                </FormGroup>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                <strong>RANKING</strong>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                      checked={checked.ranking1}
                        name="ranking1"
                        onChange={handleChangeCheck}
                        value={1}
                      />
                    }
                    label={<Rating name="read-only" value={1} readOnly />}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                      checked={checked.ranking2}
                        name="ranking2"
                        onChange={handleChangeCheck}
                        value={2}
                      />
                    }
                    label={<Rating name="read-only" value={2} readOnly />}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked.ranking3}
                        name="ranking3"
                        onChange={handleChangeCheck}
                        value={3}
                      />
                    }
                    label={<Rating name="read-only" value={3} readOnly />}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                       checked={checked.ranking4}
                        name="ranking4"
                        onChange={handleChangeCheck}
                        value={4}
                      />
                    }
                    label={<Rating name="read-only" value={4} readOnly />}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                       checked={checked.ranking5}
                        name="ranking5"
                        onChange={handleChangeCheck}
                        value={5}
                      />
                    }
                    label={<Rating name="read-only" value={5} readOnly />}
                  />
                </FormGroup>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <br></br>
          <p>COURSES FOUNDED: ({allCourses && allCourses.length > 0 ? allCourses.length : 0})</p>

          <div className="clearFilter-button-div">
        <button className="clearFilter-button" onClick={handleCleanFilters}>
          CLEAR FILTERS
        </button>
        </div>

          <br></br>
        <h3>ORDER BY</h3>
        <br></br>
          <Accordion
            expanded={expanded === "panel5"}
            onChange={handleChange("panel5")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                <strong>DATE</strong>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <RadioGroup name="use-radio-group" defaultValue="first">
                  <MyFormControlLabel
                    value="new"
                    label="NEWEST"
                    control={<Radio onChange={handleSelect2} />}
                  />
                  <MyFormControlLabel
                    value="old"
                    label="OLDER"
                    control={<Radio onChange={handleSelect2} />}
                  />
                </RadioGroup>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel6"}
            onChange={handleChange("panel6")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                <strong>RATING</strong>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <RadioGroup name="use-radio-group" defaultValue="first">
                  <MyFormControlLabel
                    value="best"
                    label="BEST RATING"
                    control={<Radio onChange={handleSelect2} />}
                  />
                  <MyFormControlLabel
                    value="worst"
                    label="LESS RATING"
                    control={<Radio onChange={handleSelect2} />}
                  />
                </RadioGroup>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel8"}
            onChange={handleChange("panel8")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                <strong>ALPHABETIC</strong>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <RadioGroup name="use-radio-group" defaultValue="first">
                  <MyFormControlLabel
                    value="A-Z"
                    label="A - Z"
                    control={<Radio onChange={handleSelect2} />}
                  />
                  <MyFormControlLabel
                    value="Z-A"
                    label="Z - A"
                    control={<Radio onChange={handleSelect2} />}
                  />
                </RadioGroup>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel9"}
            onChange={handleChange("panel9")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                <strong>PRICE</strong>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <RadioGroup name="use-radio-group" defaultValue="first">
                  <MyFormControlLabel
                    value="desc"
                    label="MOST CHEAPER"
                    control={<Radio onChange={handleSelect2} />}
                  />
                  <MyFormControlLabel
                    value="asc"
                    label="MOST EXPENSIVE"
                    control={<Radio onChange={handleSelect2} />}
                  />
                </RadioGroup>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      
    );
}

const mapStateToProps = (state) => {
  return {

      coursesByGenre: state.rootReducer.coursesByGenre,
      allCourses: state.rootReducer.allCourses
  }
}

export default connect(mapStateToProps, { searchByName, getAllCourses,getFilteredCourses, orderBy })(SearchBar)