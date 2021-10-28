
import {React, useState, useEffect} from 'react'
import { connect } from 'react-redux'
import FilterBar from '../FilterBar/FilterBar'
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


function SearchBar({coursesByGenre, searchByName, getAllCourses, getFilteredCourses, orderBy}) {
  

  const [checked, setChecked] = useState({
    level1: false,
    level2: false,
    level3: false,
    price1: false,
    price2: false,
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

  console.log("checked: ", checked)
  
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
        <h3>FILTERS</h3>
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
                    control={<Radio name="all" onChange={handleChangeCategory} />}
                  />
                  {coursesByGenre &&
                    coursesByGenre.map((g) => (
                      <MyFormControlLabel
                        value={g.name}
                        name={g.name}
                        key={g.name}
                        label={g.name.toUpperCase()}
                        control={<Radio name={g.name} onChange={handleChangeCategory} />}
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
                      <Checkbox name="level1" onClick={handleChangeCheck} />
                    }
                    label="BEGINNER"
                    value="beginner"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox name="level2" onClick={handleChangeCheck} />
                    }
                    label="MIDDLE"
                    value="middle"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox name="level3" onClick={handleChangeCheck} />
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
                      <Checkbox name="price1" onChange={handleChangeCheck} />
                    }
                    label="FREE"
                    value="free"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox name="price2" onChange={handleChangeCheck} />
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
                      <Checkbox name="languaje1" onChange={handleChangeCheck} />
                    }
                    label="SPANISH"
                    value="spanish"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox name="languaje2" onChange={handleChangeCheck} />
                    }
                    label="ENGLISH"
                    value="english"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox name="languaje3" onChange={handleChangeCheck} />
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
                    label="BEST"
                    control={<Radio onChange={handleSelect2} />}
                  />
                  <MyFormControlLabel
                    value="worst"
                    label="WORST"
                    control={<Radio onChange={handleSelect2} />}
                  />
                </RadioGroup>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
        <br></br>
        <FilterBar />
      </div>
      
    );
}

const mapStateToProps = (state) => {
  return {

      coursesByGenre: state.rootReducer.coursesByGenre
  }
}

export default connect(mapStateToProps, { searchByName, getAllCourses,getFilteredCourses, orderBy })(SearchBar)