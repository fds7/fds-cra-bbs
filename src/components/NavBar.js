import React, {Component} from 'react';
import * as firebase from 'firebase';

export default class NavBar extends Component {
  handleLogoutClick = () => {
    firebase.auth().signOut();
  }
  render() {
    return (
      <div>
        <button onClick={this.handleLogoutClick}>로그아웃</button>
      </div>
    )
  }
}
