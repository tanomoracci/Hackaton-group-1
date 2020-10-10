import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';
import SettingsVoiceIcon from '@material-ui/icons/SettingsVoice';
import VideocamIcon from '@material-ui/icons/Videocam';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function FloatingNav(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fab color="primary" aria-label="add">
        <SettingsVoiceIcon onClick={props.toggleMic}/>
      </Fab>
      <Fab aria-label="edit">
        <VideocamIcon onClick={props.toggleVideo} />
      </Fab>
      <Fab variant="extended">
        <NavigationIcon className={classes.extendedIcon} />
        SHARE LINK
      </Fab>
      <Fab aria-label="like">
        <FavoriteIcon />
      </Fab>
    </div>
  );
}