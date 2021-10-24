import React, {useEffect} from 'react'
import ReactPlayer from 'react-player'
import './Player.css'
import Comments from '../Comments/Comments'
import { connect } from 'react-redux'
import {getCoursesReviewsById} from '../../actions/actions'
import {updateInfoVideo} from '../../actions/actions'
import NewReview from '../Reviews/NewReview'


const ResponsivePlayer = ({updateInfoVideo, info, user, getCoursesReviewsById}) => {

  useEffect(() => {
    getCoursesReviewsById(info.id)
  }, [])


  const [state, setState] = React.useState ({
    playing: false, 
    ended: false,
    videoTime: 0,
  })

  const [duration, setDuration] = React.useState ({})

  if (user.coursesAndData.length >= 1) {
    var videoStatus = user.coursesAndData.filter((c) => c.course.courseId === info.id)
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
  
  
  if (state.playing && state.ended){
    videoStatus = 'completed';
  } else if(state.playing && videoStatus !== "completed") {
    videoStatus = 'started';
  }



  const videoInfo = { 
    courseId: info.id, 
    state: videoStatus, 
    timeWatched:totalTime[0], 
    lenghtVideo:state.videoTime, 
    email: user.email
  };

  // console.log("videoinfo", videoInfo)

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
                  start: startHere // setea el timepo de avance del video.
                }
              }
            }}
            width="100%"
            height="100%"
            onProgress={handleProgress}
            playing={false} //SI inicia o no acutomaticamente
            controls={true}
            onPlay={handlePlay}
            onEnded={handleEnded}
            progressInterval={10000}
            onDuration={handleDurationTime}
          />
        </div>
        <NewReview/>
        <Comments courseId={info.id}/>
        </>
      );
    
}

function mapStateToProps(state) {
  return {
    info: state.rootReducer.videoPlaying,
    user: state.rootReducer.userInfo
  }
}

export default connect(mapStateToProps, {updateInfoVideo, getCoursesReviewsById})(ResponsivePlayer);