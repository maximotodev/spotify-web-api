import { url } from 'inspector';
import ReactPlayer from 'react-player'

const Video = () => {
  return (
        <ReactPlayer
          url={"https://vimeo.com/888863800"}
          config={{vimeo: {playerOptions: {colors: ["000000", "00ADEF", "FFFFFF", "000000"]}}}}
          loop={true}
          playing={true}
          muted={true}
          playsinline={true}
          controls={true}
          style={{
            position: "absolute",
            right: "0",
            bottom: "0",
            minWidth: "100%",
            minHeight: "100%",
            }}
          // height={'100vh'}
          // width={'100%'}
        />
    
  )
};

export default Video;
