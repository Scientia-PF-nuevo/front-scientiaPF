import React from 'react'
import ReactPlayer from 'react-player'
import './Player.css'


const ResponsivePlayer = () => {

  const [state, setState] = React.useState ({
    playing: false, 
    ended: false
  })

  const [duration, setDuration] = React.useState ({})

  console.log(state)
  console.log(duration)

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
   
      return (
        <div className="player-wrapper">
          <ReactPlayer
            className="react-player"
            url="https://www.youtube.com/watch?v=PkZNo7MFNFg"
            config={{ 
              youtube: {
                playerVars: {
                  start: 330 // setea el timepo de avance del video.
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
      );
    
}

export default ResponsivePlayer;