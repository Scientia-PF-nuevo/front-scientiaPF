import {React, useState} from 'react'
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
import { searchByName, getAllCourses } from '../../actions/actions'
import './SearchBar.css'


function SearchBar({searchByName, getAllCourses}) {

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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
        <br></br>
        <h3>FILTER</h3>
        <br></br>
    
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
          <strong>LEVEL</strong>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <FormGroup>
      <FormControlLabel control={<Checkbox />} label="BEGINNER" />
      <FormControlLabel control={<Checkbox />} label="MIDDLE" />
      <FormControlLabel control={<Checkbox />} label="EXPERT" />
    </FormGroup>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography><strong>PRICE</strong></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <FormGroup>
      <FormControlLabel control={<Checkbox />} label="FREE" />
      <FormControlLabel control={<Checkbox />} label="PAID" />
    </FormGroup>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography><strong>LANGUAJE</strong></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <FormGroup>
      <FormControlLabel control={<Checkbox />} label="SPANISH" />
      <FormControlLabel control={<Checkbox />} label="ENGLISH" />
      <FormControlLabel control={<Checkbox />} label="OTHERS" />
    </FormGroup>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
          <strong>RANKING</strong>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <FormGroup>
      <FormControlLabel control={<Checkbox />} label="SPANISH" />
      <FormControlLabel control={<Checkbox />} label="ENGLISH" />
      <FormControlLabel control={<Checkbox />} label="OTHERS" />
      <FormControlLabel control={<Checkbox />} label="SPANISH" />
      <FormControlLabel control={<Checkbox />} label="ENGLISH" />
    </FormGroup>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
      </div>
    );
}

export default connect(null, { searchByName, getAllCourses })(SearchBar)