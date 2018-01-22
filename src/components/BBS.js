import React, {Component} from 'react';
import * as firebase from 'firebase';

import LoginScreen from './LoginScreen';
import ArticleListScreen from './ArticleListScreen';
import AccountScreen from './AccountScreen';

export default class BBS extends Component {
  state = {
    page: 'login'
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
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const snapshot = await firebase.database().ref(`users/${user.uid}/nickName`).once('value');
        this.setState({
          page: 'list',
          uid: user.uid,
          nickName: snapshot.val()
        });
        this.fetchArticles();
      } else {
        this.setState({
          page: 'login'
        });
      }
    });
  }
  saveNickName = async nickName => {
    const {uid} = this.state;
    await firebase.database().ref(`users/${uid}/nickName`).set(nickName);
    this.setState({
      nickName,
      page: 'list'
    });
  }
  fetchArticles = async () => {
    //
    const nickNameSnapshot = await firebase.database().ref(`users/4Q8BhqKedhcUy4e4JvjWtSrRzdJ3/nickName`).once('value');
    const nickName = nickNameSnapshot.val();
    //

    const snapshot = await firebase.database().ref('articles').once('value');
    const articlesObj = snapshot.val();
    if (articlesObj == null) {
      this.setState({
        articles: null
      });
    } else {
      const articles = Object.entries(articlesObj).map(([articleId, articleItem]) => {
        return {
          ...articleItem,
          articleId
        };
      });
      const uidSet = new Set(articles.map(({uid}) => uid));
      const uidObj = {};
      const ps = Array.from(uidSet).map(async uid => {
        const snapshot = await firebase.database().ref(`users/${uid}/nickName`).once('value');
        const nickName = snapshot.val();
        return [uid, nickName];
      })
      const pairArr = await Promise.all(ps)
      for (const [uid, nickName] of pairArr) {
        uidObj[uid] = nickName;
      }
      // for (const uid of uidArr) {
      //   const nickNameSnapshot = await firebase.database().ref(`users/${uid}/nickName`).once('value');
      //   const nickName = nickNameSnapshot.val();
      //   uidObj[uid] = nickName;
      // }
      articles.forEach(article => {
        article.author = uidObj[article.uid];
      });
      this.setState({
        articles
      });
    }
  }
  render() {
    const {nickName, uid, articles} = this.state;
    return (
      <div>
        {
          this.state.page === 'login'
          ? <LoginScreen />
          : this.state.page === 'list'
          ? <ArticleListScreen
              onNickNameClick={this.pageToAccount}
              nickName={nickName || uid}
              articleArr={articles} />
          : this.state.page === 'account'
          ? <AccountScreen
              onNickNameClick={this.pageToAccount}
              nickName={nickName || uid}
              onNickNameSubmit={this.saveNickName} />
          : null
        }
      </div>
    )
  }
}
