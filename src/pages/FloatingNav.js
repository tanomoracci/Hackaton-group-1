import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ThemeProvider from '../components/ThemeProvider';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';
import SettingsVoiceIcon from '@material-ui/icons/SettingsVoice';
import VideocamIcon from '@material-ui/icons/Videocam';
import InviteButton from '../components/InviteButton';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    },
}));

export default function FloatingNav(props) {
  const classes = useStyles();

  return (
      <ThemeProvider>
      <div className={classes.container}>
    <div className={classes.root}>
      <Fab aria-label="mic on or Off" onClick={props.toggleMic}>
        <SettingsVoiceIcon />
      </Fab>
      <Fab aria-label="video on or off" onClick={props.toggleVideo}>
        <VideocamIcon  />
      </Fab>
      <Fab variant="extended">
            <InviteButton className={classes.extendedIcon}/>
      </Fab>
      
      </div>
    </div>
    </ThemeProvider>
  );
}