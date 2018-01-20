import React, {Component} from 'react';
import * as firebase from 'firebase';
import styled from 'styled-components';

const Wrap = styled.nav`
  background-color: skyblue;
  padding: 1em;
  display: flex;
  align-items: center;
`;

const InnerLeft = styled.div`
  flex-grow: 1;
`;

const Logo = styled.div`
  display: inline-block;
  font-size: 2em;
  color: white;
  cursor: pointer;
`;

const LogOutButton = styled.button`
  padding: 1em;
  border: none;
  background-color: white;
`;

const NickName = styled.a`
  margin-left: 1em;
  color: white;
`;

export default class NavBar extends Component {
  handleLogoutClick = () => {
    firebase.auth().signOut();
  }

  handleNickNameClick = () => {
    this.props.onNickNameClick();
  }

  handleLogoClick = () => {
    this.props.onLogoClick();
  }

  render() {
    const {nickName} = this.props;
    return (
      <Wrap>
        <InnerLeft>
          <Logo onClick={this.handleLogoClick}>BBS</Logo>
        </InnerLeft>
        <LogOutButton onClick={this.handleLogoutClick}>로그아웃</LogOutButton>
        <NickName onClick={this.handleNickNameClick}>{nickName}</NickName>
      </Wrap>
    );
  }
}
