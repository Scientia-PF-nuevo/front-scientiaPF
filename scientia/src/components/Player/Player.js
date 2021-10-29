import React, {useEffect, useState} from 'react'
import ReactPlayer from 'react-player'
import './Player.css'
import Comments from '../Comments/Comments'
import { connect } from 'react-redux'
import {getCoursesReviewsById} from '../../actions/actions'
import {updateInfoVideo, getUserInfo} from '../../actions/actions'
import NewReview from '../Reviews/NewReview'


const ResponsivePlayer = ({updateInfoVideo, getUserInfo, info, user, getCoursesReviewsById}) => {


  useEffect(() => {
    getUserInfo(user.email)
    getCoursesReviewsById(info.id)
  }, [])


  const [state, setState] = React.useState ({
    playing: false, 
    ended: false,
    videoTime: 0,
  })

  const [duration, setDuration] = React.useState ({})

  if (user.coursesAndData.length >= 1) {
    var videoStatus = user.coursesAndData?.filter((c) => c.course.courseId === info.id) || 'bought'
    videoStatus = videoStatus[0].course.state
  }

  
  //redondea los segundos.
  if (user.coursesAndData.length >= 1){
    var timeConvert = user.coursesAndData.filter((c) => c.course.courseId === info.id)
    var totalTime = timeConvert.map((c) => c.course.timeWatched)
    if (duration.playedSeconds > 0) {
      totalTime[0] = parseInt(duration.playedSeconds)
    }
  }
  
  //cambia el estado del curso a completed cuando finaliza, y no lo deja volver al  estado anterior
  if (state.playing && state.ended){
    videoStatus = 'completed';
  } else if(state.playing && videoStatus !== "completed") {
    videoStatus = 'started';
  }

  // verifica si el usuario ya dejo comentario o no, para habilitar el componente de dejar un comentario
  const filterCourse = user.coursesAndData?.filter((c)=> (c.course.courseId) === info.id) || []
  const userReview = filterCourse[0].reviews.filter((r) => r.commentUser === user.email ) || []




  const videoInfo = { 
    courseId: info.id, 
    state: videoStatus, 
    timeWatched:totalTime[0], 
    lenghtVideo:state.videoTime, 
    email: user.email
  };


  const handlePlay = () => {
    setState( {...state, playing: true} )
  }

  const handleEnded = () => {
    setState({...state, ended: true})
  }

  const handleDurationTime = (time) => {
    setState({...state, videoTime: time})
  }

  const handleProgress = duration => {
    if (!duration.seeking) {
      setDuration(duration)
    }
  }

  useEffect(() => {
    updateInfoVideo(videoInfo)

  }, [duration])

  useEffect(() => {
    updateInfoVideo(videoInfo)

  }, [state.ended])

  useEffect(() => {
    updateInfoVideo(videoInfo)

  }, [state])



  var startHere=0;
  if(user.coursesAndData.length >= 1) {
    
    startHere = user.coursesAndData.filter((c) => c.course.courseId == info.id)
    startHere = startHere[0].course.timeWatched
    
  }

      return (
        <>
          <div className="player-wrapper">
            <ReactPlayer
              className="react-player"
              url={info.url}
              config={{
                youtube: {
                  playerVars: {
                    start: startHere, // setea el timepo de avance del video.
                  },
                },
              }}
              width="1280px"
              height="720px"
              onProgress={handleProgress}
              playing={false} //SI inicia o no acutomaticamente
              controls={true}
              onPlay={handlePlay}
              onEnded={handleEnded}
              progressInterval={2000}
              onDuration={handleDurationTime}
            />
          </div>

          <div className="player-wrapper">
            {userReview.length >= 1 ? null : <NewReview />}
          </div>

          <div className="player-wrapper">
            <Comments courseId={info.id} />
          </div>
        </>
      );
    
}

function mapStateToProps(state) {
  return {
    info: state.rootReducer.videoPlaying,
    user: state.rootReducer.userInfo,
  }
}

export default connect(mapStateToProps, {updateInfoVideo, getCoursesReviewsById, getUserInfo})(ResponsivePlayer);