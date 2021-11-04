import * as React from 'react';
import { styled } from '@mui/material/styles';
import { connect } from 'react-redux'
import Card from '@mui/material/Card';
import { addCart, getCoursesReviewsById, addCartLogged } from '../../actions/actions'
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextRating from '../CourseCard/Qualify';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Comments from '../Comments/Comments';
import ModalVideo from 'react-modal-video'
import bestSeller from '../../assets/bestSeller.jpg'
import topSeller from '../../assets/topSeller.jpg'
import dicount from '../../assets/discount.png'
import 'react-modal-video/scss/modal-video.scss'
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

function Details({
  details,
  addCart,
  cart,
  login,
  userInfo,
  getCoursesReviewsById,
  addCartLogged,
  urlVideo,
}) {
  const [isOpen, setOpen] = React.useState(false);

  const [expanded, setExpanded] = React.useState(false);

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
    percentageDiscount,
    numbersOfDiscounts,
    solds,
  } = details[0];

  React.useEffect(() => {
    getCoursesReviewsById(id);

  }, []);

  const hadlePlayerDemo = () => {
    setOpen(true);
  };



  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  var offer = 0;
  if (percentageDiscount > 0) {
    offer = price - (percentageDiscount / 100) * price;
  }

  const validarCart = (id) => {
    const alreadyAdded = cart.some((courseID) => courseID.coursesId === id);
    if (alreadyAdded) {
      return;
    } else {
      if (login) {
        addCartLogged({
          email: userInfo.email,
          name: name,
          id: id,
          price: price,
          url: url,
          state: "carrito",
          percentageDiscount: percentageDiscount,
          offerPrice: offer === 0 ? price : offer,
        });
      } else {
        addCart({
          name: name,
          coursesId: id,
          price: price,
          url: url,
          state: "carrito",
          percentageDiscount: percentageDiscount,
          offerPrice: offer === 0 ? price : offer,
        });
      }
    }
  };



  //extraer el videoID para la DEMO:
  if (urlVideo.urlVideo && urlVideo.urlVideo.toLowerCase().includes('youtube')) {
    var videoID = urlVideo.length === 0 ? "" : urlVideo.urlVideo.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=))([\w\-]{10,12})\b/)[1]
  } else {
    var videoID = ''
  }

  return (
    <div>
      <div className="title-details-div">
        <h1>Details</h1>
      </div>
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
            subheader={`Price: $${price - (percentageDiscount / 100) * price}`}
          />
          <CardMedia component="img" height="500" image={url} alt="Paella dish" />
          <CardContent>
            <div className="confirm-button-div">
              <button className="preview-button" onClick={hadlePlayerDemo}>
                PLAY PREVIEW
              </button>
              <ModalVideo
                channel="youtube"
                autoplay
                youtube={{
                  end: 10,
                  showinfo: 0,
                  controls: 0
                }}
                isOpen={isOpen}
                videoId={videoID}
                onClose={() => setOpen(false)}
              />
            </div>
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
              {date ? date.slice(0, 10) : "NO DATE"}
            </Typography>
            <br></br>
            <TextRating score={score ? score : 0} />
            <br></br>
            <Typography>
              <strong>DESCRIPTION:</strong>
              {description ? description : "NO INFO"}
              <br></br>
              <br></br>
              {solds > 100 ? ( // only for testing (solds > 100)
                <img src={topSeller} alt="disc" className="discount"></img>
              ) : null}
              {solds > 20 && solds < 100 ? ( // only for testing (solds > 20 && solds < 100)
                <img src={bestSeller} alt="disc" className="discount"></img>
              ) : null}
              {numbersOfDiscounts > 0 ? (
                <img src={dicount} alt="disc" className="discount"></img>
              ) : null}
            </Typography>
            <br></br>
          </CardContent>
          <br></br>
          <div className="confirm-button-div">
            <button className="confirm-button" onClick={() => validarCart(id)}>
              ADD TO CART
            </button>
          </div>
          <br></br>
          <CardActions>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
            >
              <h2>REVIEWS</h2>
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Comments />
          </Collapse>
        </Card>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    details: state.rootReducer.courseDetails,
    cart: state.rootReducer.cart,
    login: state.rootReducer.login,
    userInfo: state.rootReducer.userInfo,
    urlVideo: state.rootReducer.coursesReviews
  }
}

export default connect(mapStateToProps, { addCart, getCoursesReviewsById, addCartLogged })(Details)