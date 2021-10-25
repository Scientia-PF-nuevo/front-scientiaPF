
import {React, useState, useEffect} from 'react'
import { connect } from 'react-redux'
import FilterBar from '../FilterBar/FilterBar'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Rating from '@mui/material/Rating';
import { searchByName, getAllCourses, getFilteredCourses } from '../../actions/actions'
import './SearchBar.css'


function SearchBar({searchByName, getAllCourses, getFilteredCourses}) {
  
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
  });
  
  
  const objFinal = {
    level1: checked.level1 === true ? "begginer" : "",
    level2: checked.level2 === true ? "middle" : "",
    level3: checked.level3 === true ? "expert" : "",
    price1: checked.price1 === true ? 0 : "",
    price2: checked.price2 === true ? 1 : "",
    languaje1: checked.languaje1 === true ? "spanish" : "",
    languaje2: checked.languaje2 === true ? "english" : "",
    languaje3: checked.languaje3 === true ? "others" : "",
    ranking1: checked.ranking1 === true ? 1 : "",
    ranking2: checked.ranking2 === true ? 2 : "",
    ranking3: checked.ranking3 === true ? 3 : "",
    ranking4: checked.ranking4 === true ? 4 : "",
    ranking5: checked.ranking5 === true ? 5 : "",
  }
  
  console.log(objFinal)
  
  const handleChangeCheck = (event) => {
    setChecked({...checked, [event.target.name]: event.target.checked});
  };
  
  useEffect(() => {
    getFilteredCourses(objFinal)
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

  // const handleChange = (panel) => (event, isExpanded) => {
  //   setExpanded(isExpanded ? panel : false);
  // };

  // const [input, setInput] = useState({
  //   buscar: ''
  // })

  const handleInputChange = function (e) {
    setInput({
      [e.target.name]: e.target.value
    });
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
          Search
        </button>
        <button className="search-icon" onClick={() => getAllCourses()}>
          Reset
        </button>
        <FilterBar />
        <br></br>
        <h3>FILTER</h3>
        <br></br>

        <div>
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
                  <FormControlLabel control={<Checkbox name='level1' onClick={handleChangeCheck}/>} label="BEGINNER" value="beginner"/>
                  <FormControlLabel control={<Checkbox name='level2' onClick={handleChangeCheck}/>} label="MIDDLE" value="middle"/>
                  <FormControlLabel control={<Checkbox name='level3' onClick={handleChangeCheck}/>} label="EXPERT" value="expert"/>
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
                <FormControlLabel control={<Checkbox name='price1' onChange={handleChangeCheck}/>} label="FREE" value="free"/>
                <FormControlLabel control={<Checkbox name='price2' onChange={handleChangeCheck}/>} label="PAID" value="paid"/>
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
                <FormControlLabel control={<Checkbox name='languaje1' onChange={handleChangeCheck}/>} label="SPANISH" value="spanish"/>
                <FormControlLabel control={<Checkbox name='languaje2' onChange={handleChangeCheck}/>} label="ENGLISH" value="english"/>
                <FormControlLabel control={<Checkbox name='languaje3' onChange={handleChangeCheck}/>} label="OTHERS" value="others"/>
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
                    control={<Checkbox name='ranking1' onChange={handleChangeCheck} value={1}/>}
                    label={<Rating name="read-only" value={1} readOnly />}
                  />
                  <FormControlLabel
                    control={<Checkbox name='ranking2' onChange={handleChangeCheck} value={2}/>}
                    label={<Rating name="read-only" value={2} readOnly />}
                  />
                  <FormControlLabel
                    control={<Checkbox name='ranking3' onChange={handleChangeCheck} value={3}/>}
                    label={<Rating name="read-only" value={3} readOnly />}
                  />
                  <FormControlLabel
                    control={<Checkbox name='ranking4' onChange={handleChangeCheck} value={4}/>}
                    label={<Rating name="read-only" value={4} readOnly />}
                  />
                  <FormControlLabel
                    control={<Checkbox name='ranking5' onChange={handleChangeCheck} value={5}/>}
                    label={<Rating name="read-only" value={5} readOnly />}
                  />
                </FormGroup>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>

 
      </div>

    
  );
}

export default connect(null, { searchByName, getAllCourses,getFilteredCourses })(SearchBar)