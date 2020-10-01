// @ts-nocheck
 
import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import mq from '../utils/styles/media-queries';
import { colorToString } from '../utils/colorify';
import Roster from './Roster';
import SidebarLinks from './SidebarLinks';
import SidebarUserControls from './SidebarUserControls';

const Container = styled.div`
  position: relative;
  padding: 10px;
  ${mq.MOBILE} {
    position: absolute;
    z-index: 200;
    top: 0;
    width: 185px;
  }
  ${mq.SMALL_DESKTOP} {
    width: 220px;
    position: absolute;
    background: transparent;
    z-index: 10;
  }
`;

interface Props {
  roomAddress: string;
  activeSpeakerView: boolean;
  toggleActiveSpeakerView: () => void;
  pttMode: boolean;
  togglePttMode: (e: React.SyntheticEvent) => void;
  roomId: string;
}

interface State {
  showPasswordModal: boolean;
}

export default class Sidebar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { showPasswordModal: false };
  }

  public render() {
    const {
      roomAddress,
      activeSpeakerView,
      toggleActiveSpeakerView,
      pttMode,
      togglePttMode,
      roomId,
    } = this.props;

    return (
      <Container>
        <SidebarUserControls
          activeSpeakerView={activeSpeakerView}
          toggleActiveSpeakerView={toggleActiveSpeakerView}
          pttMode={pttMode}
          togglePttMode={togglePttMode}
        />
        <Roster roomAddress={roomAddress} />
        <SidebarLinks roomId={roomId} />
      </Container>
    );
  }
}
