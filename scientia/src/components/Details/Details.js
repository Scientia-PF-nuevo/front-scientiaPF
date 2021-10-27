import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { connect } from 'react-redux'
import TextRating from '../CourseCard/Qualify';
import {addCart, getCoursesReviewsById} from '../../actions/actions'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Comments from '../Comments/Comments';
import './Details.css'


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;


  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Details({login, details,addCart, cart, getCoursesReviewsById}) {


  const [expanded, setExpanded] = React.useState(false);

  const detailsRender = details[0] 

  const {
    name,
    description,
    price,
    url,
    categories,
    id,
    score,
    date,
    level,
    language,
  } = detailsRender;

  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const MyOptions = [
    "EJEMPLO 1",
    "EJEMPLO 2",
    "EJEMPLO 3",
    "EJEMPLO 4",
  ];

  React.useEffect(() => {
    getCoursesReviewsById(id)
  }, [])
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const open = Boolean(anchorEl);
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const validarCart = (id) => {
    const alreadyAdded = cart.some(courseID => courseID.id === id);
     if(alreadyAdded) {
         return;
    } else {
      addCart({ name: name, id: id, price: price })
    }
  }

  return (
    <div className="details-div">
    <Card sx={{ maxWidth: 900 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {id}
          </Avatar>
        }
        action={
          <>
          <IconButton aria-label="settings" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu 
        anchorEl={anchorEl} 
        keepMounted onClose={handleClose} 
        open={open}>
        {MyOptions.map((option) => (
          <MenuItem
            key={option} 
            onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
      </>
        }
        title={name && name.toUpperCase()}
        subheader={`Price: $${price}`}
      />
      <CardMedia
        component="img"
        height="500"
        image={url}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.primary">
        <strong>CATEGORY:</strong> {categories?.toUpperCase() || ""}
        </Typography>
        <br></br>
        <Typography variant="body2" color="text.primary">
        <strong>LEVEL:</strong> {level?.toUpperCase() || ""}
        </Typography>
        <br></br>
        <Typography variant="body2" color="text.primary">
          <strong>LANGUAJE: </strong> {language?.toUpperCase() || ""}
        </Typography>
        <br></br>
        <Typography variant="body3" color="text.primary">
        <strong>DATE: </strong>{date ? date : "NO DATE"}
        </Typography>
        <br></br>
        <br></br>
        <Typography variant="body2" color="text.primary">
          <strong>DESCRIPTION:</strong> {description ? description : "NO INFO"}
        </Typography>
        <br></br>
        <TextRating score={score ? score : 0} />
      </CardContent>
      <CardActions disableSpacing>
      { (
            <IconButton color="primary" aria-label="add to shopping cart">
              <AddShoppingCartIcon
                onClick={() => validarCart(id)}
              />
            </IconButton>
          )}
        <IconButton aria-label="add to favorites">
          {/* <FavoriteIcon /> */}
        </IconButton>
        <IconButton aria-label="share">
          {/* <ShareIcon /> */}
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Comments/>
      </Collapse>
    </Card>
    </div>
  );
}

function mapStateToProps(state) {
    return {
        details: state.rootReducer.courseDetails,
        cart : state.rootReducer.cart,
        login: state.rootReducer.login,
    }
}

export default connect(mapStateToProps, {addCart,getCoursesReviewsById})(Details)