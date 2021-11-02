import React from 'react'
import { Divider, Grid, Paper } from "@material-ui/core";
import './NewReview.css'
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import {connect} from 'react-redux'
import {createReview} from '../../actions/actions'
import { useSnackbar } from 'notistack';
import Slide from '@material-ui/core/Slide';


function NewReview({createReview, videoplaying, userInfo}) {

  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariantOk = () => {
    enqueueSnackbar("THANKS FOR YOUR RATING, YOU WILL SEE SOON", {
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left",
      },
      TransitionComponent: Slide,
      variant: "success",
    });
  };

  const handleClickVariantWrong = () => {
    enqueueSnackbar('COMPLETE ALL FIELDS', {
      anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',              
      },
      TransitionComponent: Slide,
      variant: 'error',
  })
  }

    const [score, setScore] = React.useState(0);
    const [comments, setComments] = React.useState('');

    const handleChange = (event) => {
        setComments(event.target.value);
      };

    const review = {
    comments: comments,
		score: score,
		email: userInfo.email,
		courseId: videoplaying.id
    }
  
    const [show, setShow] = React.useState(true)

    const handleSubmit = () => {
        if(review.comments !== "" && review.score >=1){
            createReview(review)
            setScore(0)
            setComments('')
            handleClickVariantOk()
            setShow(false)

        } else {
          handleClickVariantWrong()
        }
    }


    return (
      <>
        {show ? (
          <div className="reviews-container">
            <Paper style={{ padding: "20px" }}>
              <Grid container wrap="nowrap" spacing={2}>
                <Grid justifyContent="left" item xs zeroMinWidth>
                  <h4
                    style={{
                      marginBottom: "20px",
                      textAlign: "left",
                      color: "blue",
                    }}
                  >
                    LEAVE YOUR RATING:
                  </h4>
                  <br></br>
                  <p style={{ textAlign: "left" }}>Write here:</p>
                  <TextField
                    style={{ width: "750px", marginBottom: "20px" }}
                    multiline
                    maxRows={10}
                    value={comments}
                    onChange={handleChange}
                  />
                  <Typography component="legend">Rate</Typography>
                  <Rating
                    style={{ marginBottom: "20px" }}
                    name="simple-controlled"
                    value={score}
                    onChange={(event, newValue) => {
                      setScore(newValue);
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                onClick={handleSubmit}
                variant="contained"
                endIcon={<SendIcon />}
              >
                Send
              </Button>
              <Divider variant="fullWidth" style={{ margin: "10px 0" }} />
            </Paper>
          </div>
        ) : null}
      </>
    );
}

function mapStateToProps(state) {
    return {
        userInfo: state.rootReducer.userInfo,
        videoplaying: state.rootReducer.videoPlaying
    }
}

export default connect(mapStateToProps, {createReview})(NewReview)
