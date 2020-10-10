// @ts-nocheck
import RoomControls from './RoomControls'
import React, { Component } from 'react';
import Room from '../components/Room';
import ThemeProvider from '../components/ThemeProvider';
import LocalMediaControls from './LocalMediaControls';

interface Props {
  configUrl: string;
  roomName?: string;
}

class RoomViewComponent extends Component<Props> {
  public render() {
    const {
      roomName,
      configUrl,
      externalVideo,
      myVideo,
      externalAudio,
      myAudio,
      screensaver,
      thumbnail,
      callback,
    } = this.props;

    return (
          <ThemeProvider>
       
           {roomName &&
            <Room
              name={roomName}
              configUrl={configUrl}
              myAudio={myAudio === false ? false : true}
              myVideo={myVideo === false ? false : true}
              externalVideo={externalVideo === false ? false : true} // this is the mirror
              Screensaver={screensaver}
              thumbnail={thumbnail === false ? false : true}
              callback={callback}
            />
            }
          

      
      </ThemeProvider>
    );
  }
}

export default RoomViewComponent;
