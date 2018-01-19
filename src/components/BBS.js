import React, {Component} from 'react';
import * as firebase from 'firebase';

import LoginScreen from './LoginScreen';
import ArticleListScreen from './ArticleListScreen';
import AccountScreen from './AccountScreen';

export default class BBS extends Component {
  state = {
    page: null
  }
  pageToAccount = () => {
    this.setState({
      page: 'account'
    });
  }
  componentDidMount() {
    const config = {
      apiKey: "AIzaSyC5bvpoKyfa3qwTxhSt0PxgQZI2dI3QbZc",
      authDomain: "fds-cra.firebaseapp.com",
      databaseURL: "https://fds-cra.firebaseio.com",
      projectId: "fds-cra",
      storageBucket: "fds-cra.appspot.com",
      messagingSenderId: "966283711333"
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          page: 'list',
          uid: user.uid
        });
        firebase.database().ref(`users/${user.uid}/nickName`).on('value', snapshot => {
          this.setState({
            nickName: snapshot.val() || user.uid
          });
        });
      } else {
        this.setState({
          page: 'login'
        });
      }
    });
  }

  saveNickName = async ({nickName}) => {
    const {uid} = this.state;
    await firebase.database().ref(`users/${uid}/nickName`).set(nickName);
    this.setState({
      page: 'list'
    });
  }

  render() {
    const {nickName} = this.state;
    return (
      <div>
        {
          this.state.page === 'login'
          ? <LoginScreen />
          : this.state.page === 'list'
          ? <ArticleListScreen onNickNameClick={this.pageToAccount} nickName={nickName} />
          : this.state.page === 'account'
          ? <AccountScreen onFormSubmit={this.saveNickName} nickName={nickName} />
          : null
        }
      </div>
    )
  }
}
