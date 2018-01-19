import React, {Component} from 'react';
import * as firebase from 'firebase';

import LoginScreen from './LoginScreen';
import ArticleListScreen from './ArticleListScreen';
import AccountScreen from './AccountScreen';
import ArticleScreen from './ArticleScreen';

export default class BBS extends Component {
  state = {
    page: null,
    articles: null
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
        this.fetchArticles();
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

  viewArticle = async articleId => {
    const {uid} = this.state;
    const articleSnapshot = await firebase.database().ref(`/articles/${articleId}`).once('value');
    const articleData = articleSnapshot.val();
    const nickNameSnapshot = await firebase.database().ref(`/users/${uid}/nickName`).once('value');
    const author = nickNameSnapshot.val();
    this.setState({
      page: 'article',
      article: {
        author,
        ...articleData
      }
    });
  }

  fetchArticles = async () => {
    const snapshot = await firebase.database().ref('articles').once('value');
    const articlesObj = snapshot.val();
    const articles = (
      articlesObj == null
      ? []
      : Object.entries(articlesObj).map(([articleId, article]) => ({
          articleId,
          ...article
        }))
    );
    this.setState({
      articles
    });
  }

  render() {
    const {nickName, articles, page, article} = this.state;
    return (
      <div>
        {
          page === 'login'
          ? <LoginScreen />
          : page === 'list'
          ? <ArticleListScreen
            onNickNameClick={this.pageToAccount}
            onArticleItemClick={this.viewArticle}
            nickName={nickName}
            articles={articles} />
          : page === 'account'
          ? <AccountScreen
            onFormSubmit={this.saveNickName}
            nickName={nickName} />
          : page === 'article'
          ? <ArticleScreen
            {...article}
            nickName={nickName} />
          : 'Loading...'
        }
      </div>
    )
  }
}
