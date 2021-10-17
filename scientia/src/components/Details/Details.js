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
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { connect } from 'react-redux'
import TextRating from '../CourseCard/Qualify';
import {addCart} from '../../actions/actions'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
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

function Details({details,addCart, cart}) {
  const [expanded, setExpanded] = React.useState(false);

  const detailsRender = details[0] 

  const { name, description, price, url, categories, id, score, date } = detailsRender


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
    <Card sx={{ maxWidth: 700 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {id}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
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
          {categories && `CATEGORY: ${categories.toUpperCase()}`}
        </Typography>
        <Typography variant="body3" color="text.primary">
        {`Release Date: ${date ? date : "SIN FECHA"}`}
        </Typography>
        <Typography variant="body2" color="text.primary">
          {description}
        <TextRating score={score} />
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      {id && (
            <IconButton color="primary" aria-label="add to shopping cart">
              <AddShoppingCartIcon
                onClick={() => validarCart(id)}
              />
            </IconButton>
          )}
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
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
        <CardContent>
          <Typography paragraph>Details:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
  
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    </div>
  );
}

function mapStateToProps(state) {
    return {
        details: state.rootReducer.courseDetails,
        cart : state.rootReducer.cart
    }
}

export default connect(mapStateToProps, {addCart})(Details)