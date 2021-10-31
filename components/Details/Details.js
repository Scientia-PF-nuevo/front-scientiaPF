import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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

function Details({details,addCart, cart, getCoursesReviewsById}) {


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
    percentageDiscount
  } = detailsRender;


  const [anchorEl, setAnchorEl] = React.useState(null);

  React.useEffect(() => {
    getCoursesReviewsById(id)
  }, [])


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  var offer = 0;
  if (percentageDiscount > 0) {

    offer = price - ((percentageDiscount / 100) * price)
  }

  const validarCart = (id) => {
    const alreadyAdded = cart.some(courseID => courseID.id === id);
     if(alreadyAdded) {
         return;
    } else {
      addCart({ name: name, id: id, price: price, url: url,percentageDiscount: percentageDiscount, offerPrice: offer === 0 ? price : offer })
    }
  }

  return (
    <div className="details-div">
      <Card sx={{ maxWidth: 900 }}>
        <CardHeader
          action={
            <>
              <IconButton aria-label="add to shopping cart">
                <AddShoppingCartIcon onClick={() => validarCart(id)} />
              </IconButton>
            </>
          }
          title={name && name.toUpperCase()}
          subheader={`Price: $${price - ((percentageDiscount / 100) * price)}`}
        />
        <CardMedia component="img" height="500" image={url} alt="Paella dish" />
        <CardContent>
          <Typography>
            <strong>CATEGORY:</strong>{" "}
            {categories?.toUpperCase() || "No Categoty Defined"}
          </Typography>
          <br></br>
          <Typography>
            <strong>LEVEL:</strong> {level?.toUpperCase() || "No Level Defined"}
          </Typography>
          <br></br>
          <Typography>
            <strong>LANGUAGE: </strong>{" "}
            {language?.toUpperCase() || "No Language Defined "}
          </Typography>
          <br></br>
          <Typography>
            <strong>DATE: </strong>
            {date ? date : "NO DATE"}
          </Typography>
          <br></br>
          <br></br>
          <Typography>
            <strong>DESCRIPTION:</strong>{" "}
            {description ? description : "NO INFO"}
          </Typography>
          <br></br>
          <TextRating score={score ? score : 0} />
        </CardContent>
        <br></br>
        <div className="confirm-button-div">
        <button className="confirm-button" onClick={() => validarCart(id)}>
          ADD TO CART
        </button>
        </div>
        <CardActions>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
          >
            <ExpandMoreIcon />
          <p>Reviews</p>
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Comments />
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