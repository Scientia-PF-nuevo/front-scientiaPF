import React from 'react'
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import './Comments.css'
import TextRating from '../CourseCard/Qualify';
import { connect } from 'react-redux';


function Comments({coursesReviews}) {
  // if (coursesReviews.reviews && coursesReviews.reviews.length >= 1) {

  // }

  return (
    <div style={{ padding: 14, width: 800 }} className="comments-div">
      <h1>Comments</h1>
      {
        (coursesReviews.reviews && coursesReviews.reviews.length >= 1)

          ?

          (coursesReviews.reviews.map((rev) =>

            <Paper style={{ padding: "40px 20px" }}>
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  {/* <Avatar alt="Remy Sharp" src={imgLink} /> */}
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                  <h4 style={{ margin: 0, textAlign: "left", color: "red" }}>{rev.commentUser}</h4>
                  <br></br>
                  <p style={{ textAlign: "left" }}>
                    REVIEW: {rev.comments}
                  </p>
                  <p style={{ textAlign: "left", color: "gray" }}>
                    POSTED: {(rev.createdAt.slice(0, 10))}
                  </p>
                  <TextRating score={rev.score} />
                </Grid>
              </Grid>
              <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
            </Paper>

          )

          )

          :

          (
            <h1>CURSO SIN REVIEWS</h1>
          )

      }

    </div>
  );
}

function mapStateToProps(state) {
  return {
    coursesReviews: state.rootReducer.coursesReviews
  }
}

export default connect(mapStateToProps, null)(Comments);