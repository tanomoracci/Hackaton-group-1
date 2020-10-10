import VolumeMeter from '../components/VolumeMeter'
import React, {useState} from 'react';
import RoomViewComponent from '../components/RoomViewComponent';
import InviteButton from  '../components/InviteButton'
import { Container, Paper, Box } from '@material-ui/core';
import FloatingNav from './FloatingNav';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  container: {
    height: '500px',
    width: '900px',
    margin: ' 0 auto',
    display: 'flex',
  },
  nav: {
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
      <Box p={2} pb={5} className={classes.container}>
     
      <Paper elevation={4} >
        <div className={classes.room}>
        <FloatingNav toggleMic={toggleMic} toggleVideo={toggleVideo} className={classes.nav} />
        <RoomViewComponent
        roomName={'testingroom'}
        configUrl={'https://api.simplewebrtc.com/config/guest/57b6ffcbb7bb9769d8d56fcb'}
        myAudio={mic}
        myVideo={video}
        />
        
        <VolumeMeter /> 
        </div>
      </Paper>
    
    </Box>
        
    </>
  );
}
