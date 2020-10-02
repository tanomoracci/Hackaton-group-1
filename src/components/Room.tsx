// @ts-nocheck

import {
  Actions,
  Connected,
  Connecting,
  Disconnected,
  Failed,
  Provider,
  RemoteAudioPlayer,
  Room
} from '@andyet/simplewebrtc';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import HiddenPeers from '../utils/contexts/HiddenPeers';
import mq from '../utils/styles/media-queries';
import Haircheck from './Haircheck';
import PasswordEntry from './PasswordEntry';
import PeerGrid from './PeerGrid';
import Sidebar from './Sidebar';
import SoundPlayer from './SoundPlayer';

const PasswordEntryContainer = styled.div({
  alignItems: 'center',
  display: 'flex',
  flex: '1 1 0%',
  justifyContent: 'center',
  position: 'relative'
});

const RootContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  minHeight: 'calc(var(--vh, 1vh) * 100)'
});

const Container = styled.div({
  flex: 1,
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  [mq.SMALL_DESKTOP]: {
    flexDirection: 'row'
  }
});

const LoadingState = styled.div({
  alignItems: 'center',
  display: 'flex',
  flex: '1 1 0%',
  justifyContent: 'center',
  position: 'relative'
});

const MirrorState = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  zindex: 100,
  width: '100%',
  height: '100%',
  background: 'black',
});

interface Props {
  configUrl: string;
  userData?: string;
  name: string;
  initialPassword?: string;
  myAudio: boolean;
  myVideo: boolean;
  mute?: () => void;
  unmute?: () => void;
  resumeVideo?: () => void;
  pauseVideo?: () => void;
}

interface State {
  activeSpeakerView: boolean;
  consentToJoin: boolean;
  pttMode: boolean;
  sendRtt: boolean;
  password?: string;
  chatOpen: boolean;
  hiddenPeers: string[];
}

class Index extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeSpeakerView: false,
      consentToJoin: false,
      password: props.initialPassword,
      pttMode: false,
      sendRtt: false,
      chatOpen: false,
      hiddenPeers: [],
    };
  }

  public componentDidUpdate() {
    if (this.props.myAudio && this.props.unmute) {
      this.props.unmute();
    } else if (!this.props.myAudio && this.props.mute) {
      this.props.mute();
    }
    if (this.props.myVideo && this.props.resumeVideo) {
      this.props.resumeVideo();
    } else if (!this.props.myVideo && this.props.pauseVideo) {
      this.props.pauseVideo();
    }
  }

  public render() {
    const { Screensaver } = this.props
    return (
      <Provider configUrl={this.props.configUrl} userData={this.props.userData}>
        <RemoteAudioPlayer />
        <HiddenPeers.Provider
          value={{
            hiddenPeers: this.state.hiddenPeers,
          }}
        >
          <RootContainer>
            {!this.state.consentToJoin && (
              <Haircheck
                onAccept={() => {
                  this.setState({ consentToJoin: true });
                  this.props.callback ? this.props.callback() : () => null
                }}
              />
            )}

            {this.state.consentToJoin && (
              <Room password={this.state.password} name={this.props.name}>
                {({ room }) => {
                  return (
                    <Container>
                      <SoundPlayer roomAddress={room.address!} />
                      {this.props.thumbnail && <Sidebar
                        roomAddress={room.address!}
                        activeSpeakerView={this.state.activeSpeakerView}
                        roomId={room.id!}
                        toggleActiveSpeakerView={() => null}
                        pttMode={false}
                        togglePttMode={() => null}
                      />}
                      <Connecting>
                        <LoadingState>
                          <h1>Connecting...</h1>
                        </LoadingState>
                      </Connecting>
                      <Disconnected>
                        <LoadingState>
                          <h1>Lost connection. Reattempting to join...</h1>
                        </LoadingState>
                      </Disconnected>
                      <Failed>
                        <LoadingState>
                          <h1>Connection failed.</h1>
                        </LoadingState>
                      </Failed>
                      <Connected>
                        {room.joined && this.props.externalVideo ? (
                          <PeerGrid
                            roomAddress={room.address!}
                            activeSpeakerView={this.state.activeSpeakerView}
                            setPassword={this.setPassword}
                          />
                        ) : room.passwordRequired ? (
                          <PasswordEntryContainer>
                            <PasswordEntry
                              setting={false}
                              passwordIsIncorrect={!!this.state.password}
                              setPassword={this.setPassword}
                            />
                          </PasswordEntryContainer>
                        ) : room.roomFull ? (
                          <LoadingState>
                            <h1>This room is full.</h1>
                          </LoadingState>
                        ) : room.roomNotStarted ? (
                          <LoadingState>
                            <h1>This room has not started yet.</h1>
                          </LoadingState>
                        ) : room.banned ? (
                          <LoadingState>
                            <h1>This room is not available.</h1>
                          </LoadingState>
                        ) : this.props.externalVideo ? (
                          <LoadingState>
                            <h1>Joining room...</h1>
                          </LoadingState>
                        ) : !this.props.externalVideo && (
                          <>
                            {Screensaver && <Screensaver />}
                            {!Screensaver && <MirrorState />}
                          </>
                        )}
                      </Connected>
                    </Container>
                  );
                }}
              </Room>
            )}
          </RootContainer>
        </HiddenPeers.Provider>
      </Provider>
    );
  }

  private setPassword = (password: string) => {
    if (password) {
      // eslint-disable-next-line no-restricted-globals
      history.pushState(null, '', `${window.location.pathname}?password=${password}`);
    } else {
      // eslint-disable-next-line no-restricted-globals
      history.pushState(null, '', `${window.location.pathname}`);
    }
    this.setState({ password });
  };
}

function mapDispatchToProps(dispatch: any, props: Props): Props {
  return {
    ...props,
    mute: () => dispatch(Actions.muteSelf()),
    unmute: () => dispatch(Actions.unmuteSelf()),
    pauseVideo: () => dispatch(Actions.pauseSelfVideo()),
    resumeVideo: () => dispatch(Actions.resumeSelfVideo())
  };
}

export default connect(null, mapDispatchToProps)(Index);
