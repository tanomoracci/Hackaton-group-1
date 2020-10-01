import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
  wrapper: {
    width: 500,
    textAlign: 'left',
    margin: '0 auto',
    padding: '50px 0px'
  },
  input: {
    marginBottom: 30
  },
  paragraph: {
    margin: '50px 0 100px',
    opacity: '.5'
  }
}));

export const Home = (props) => {
  const classes = useStyles();
  const [room, setRoom] = useState(false);
  const [roomName, setRoomName] = useState('')
  const localRoom = localStorage.getItem('room');

  useEffect(() => {
    if (localRoom || room) {
      props.history.push('/room');
    }
  }, [room]);

  const storeRoomName = () => {
    // Save to FB
    localStorage.setItem('room', roomName);
    setRoom(true);
  }

  const onInputChange = (e) => {
    setRoomName(e.target.value)
  }

  return (
    <div className={classes.wrapper}>
      {!room &&
        <div className={classes.wrapper}>
          <p className={classes.paragraph}>
            Some random text explaining why you need a room and all that.
          </p>
          <TextField
            label="Insert room name"
            value={roomName}
            onChange={onInputChange}
            fullWidth
            className={classes.input}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={storeRoomName}
            disabled={!roomName}
          >
            Create room
          </Button>
        </div>
      }
    </div>
  );
}
