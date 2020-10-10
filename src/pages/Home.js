import VolumeMeter from '../components/VolumeMeter'
import React, {useState} from 'react';
import RoomViewComponent from '../components/RoomViewComponent';
import { Container, Paper, Box } from '@material-ui/core';
import FloatingNav from './FloatingNav';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
  container: {
    height: '600px !important',
    /* width: '900px !important', */
    margin: ' auto',
    display: 'flex',
    direction: 'row',
    justifyContent: 'center',
    marginTop: '25px !importa,nt'
    },

  
}));


export const Home = (props) => {
  const classes = useStyles();

  const [mic, setMic] = useState(true);
  const [video, setVideo] = useState(true)

  const toggleMic = () => setMic(!mic)
  const toggleVideo = () => setVideo(!video)

  return (
    <>  
      <Box  >
      
      <div elevation={4} mb={4} className={classes.container}>
        <div className={classes.room}>
        
        <FloatingNav toggleMic={toggleMic} toggleVideo={toggleVideo} className={classes.nav} />
        <VolumeMeter /> 
        <RoomViewComponent className='classes.view'
        roomName={'testingroom'}
        configUrl={'https://api.simplewebrtc.com/config/guest/57b6ffcbb7bb9769d8d56fcb'}
        myAudio={mic}
        myVideo={video}
        />
        
        
        </div>
      </div> 
    </Box>
    </>
  );
}
