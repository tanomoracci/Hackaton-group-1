import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import RoomViewComponent from '../components/RoomViewComponent';
import { getRooms } from '../requests/axios';
import Button from '@material-ui/core/Button';
import { WeatherWidget } from '../components/WeatherWidget'

const useStyles = makeStyles(() => ({
  wrapper: {
    backgroundColor: 'transparent',
    position: 'relative'
  },
  actions: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    zIndex: 1000,
  },
  actionButton: {
    margin: 5
  },
  screensaver: {
    width: '100%'
  },
  video: {},
  widget: {
    position: 'absolute',
    right: 20,
    top: 20,
  }
}));

const defaultSettings = {
  externalVideo: true,
  myVideo: true,
  externalAudio: true,
  myAudio: true,
  thumbnail: true,
  screensaver: false,
}

export const Room = () => {
  const classes = useStyles();
  const [configured, setConfigured] = useState(false);
  const [rooms, setRooms] = useState({});
  const [requested, setRequested] = useState(false);
  const [settings, setSettings] = useState(defaultSettings);
  const localRoom = localStorage.getItem('room');

  useEffect(() => {
    if (!requested) {
      getRooms().then(r => {
        setRequested(true)
        setRooms(r.data);
      });
    }
  });

  const toggleSetting = (setting) => {
    setSettings({...settings, [setting]: !settings[setting]})
  }

  const toggleScreensaver = () => {
    if (settings.screensaver) {
      setSettings({...settings, screensaver: false})
    } else {
      setSettings({...settings, screensaver: Screensaver})
    }
  }

  const Screensaver = () => {
    return (
      <img
        src="https://i.giphy.com/media/xT9IgN8YKRhByRBzMI/source.gif"
        className={classes.screensaver}
      />);
  }

  const consentTojoin = () => {
    setConfigured(true)
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.video}>
        {localRoom &&
          <div>
            <RoomViewComponent
              roomName={localRoom}
              configUrl={'https://api.simplewebrtc.com/config/guest/1ea870b48756b8800d83588d'}
              externalVideo={settings.externalVideo}
              myVideo={settings.myVideo}
              myAudio={settings.myAudio}
              externalAudio={settings.externalAudio}
              screensaver={settings.screensaver}
              thumbnail={settings.thumbnail}
              callback={consentTojoin}
            />
            { configured &&
              <div className={classes.actions}>
                <Button className={classes.actionButton} size="small" color="primary" variant="contained" onClick={() => toggleSetting('thumbnail')}>Hide thumbnail</Button>
                <Button className={classes.actionButton} size="small" color="primary" variant="contained" onClick={() => toggleSetting('myVideo')}>Toggle my Video</Button>
                <Button className={classes.actionButton} size="small" color="primary" variant="contained" onClick={() => toggleSetting('myAudio')}>Toggle my Audio</Button>
                <Button className={classes.actionButton} size="small" color="primary" variant="contained" onClick={() => toggleSetting('externalAudio')}>Toggle external audio</Button>
                <Button className={classes.actionButton} size="small" color="primary" variant="contained" onClick={() => toggleScreensaver()}>Screensaver</Button>
                <Button className={classes.actionButton} size="small" color="primary" variant="contained" onClick={() => toggleSetting('externalVideo')}>Mirror mode</Button>
              </div>
            }
            {!settings.externalVideo && !settings.thumbnail &&
              <div className={classes.widget}><WeatherWidget /></div>
            }
          </div>
        }

        {!localRoom &&
          <div>Sir. You need to configure this room's name first.</div>
        }
      </div>
    </div>
  );
}
