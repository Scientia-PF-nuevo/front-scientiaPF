import React from 'react'
import ReactPlayer from 'react-player'
import './Player.css'
import Comments from '../Comments/Comments'
import { connect } from 'react-redux'
import {updateInfoVideo} from '../../actions/actions'


const ResponsivePlayer = ({updateInfoVideo, info, user}) => {

  const [state, setState] = React.useState ({
    playing: false, 
    ended: false,
    videoTime: 0,
  })

  const [duration, setDuration] = React.useState ({})

  // verifica el estado del curso
  var videoStatus = 'bought';
  if (state.playing && state.ended){
    videoStatus = 'completed';
  } else if(state.playing) {
    videoStatus = 'started';
  }

  //redondea los segundos.
   var time = 0;
  if (duration.playedSeconds > 0) {
    time = parseInt(duration.playedSeconds)
  }

  const videoInfo = { 
    courseId: info.id, 
    state: videoStatus, 
    timeWatched:time, 
    lenghtVideo:state.videoTime, 
    email: user.email
  };

 

  // console.log(videoInfo)
  // console.log(state)
  // console.log(duration)

  const handlePlay = () => {
    // console.log('onPlay')
    setState( {...state, playing: true} )
  }

  const handleEnded = () => {
    // console.log('onEnded')
    setState({...state, ended: true})
  }

  const handleDurationTime = (time) => {
    // console.log('onEnded')
    setState({...state, videoTime: time})
  }

  const handleProgress = duration => {
    // console.log('onProgress', s)
    // We only want to update time slider if we are not currently seeking
    if (!duration.seeking) {
      setDuration(duration)
    }
  }

  console.log(info.id)

  var startHere=0;
  if(user.bought_courses.length >= 1) {
    startHere = user.bought_courses.filter((course) => course.courseId === info.id)
  }

  if (startHere[0].timeWatched > 0) {
    startHere = startHere[0].timeWatched
  }

  console.log(startHere)

   
      return (
        <>
        <div className="player-wrapper">
          <ReactPlayer
            className="react-player"
            url="https://www.youtube.com/watch?v=PkZNo7MFNFg"
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
            onDuration={handleDurationTime}
          />
        </div>
        <button onClick={()=> updateInfoVideo(videoInfo)}>FETCH UPDATE INFO</button>
        <Comments/>
        </>
      );
    
}

function mapStateToProps(state) {
  return {
    info: state.rootReducer.videoPlaying,
    user: state.rootReducer.userInfo.usuario
  }
}

export default connect(mapStateToProps, {updateInfoVideo})(ResponsivePlayer);