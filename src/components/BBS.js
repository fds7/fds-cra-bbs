import React, {Component} from 'react';
import * as firebase from 'firebase';

import LoginScreen from './LoginScreen';
import ArticleListScreen from './ArticleListScreen';
import AccountScreen from './AccountScreen';
import ArticleScreen from './ArticleScreen';
import NewArticleScreen from './NewArticleScreen';

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
  pageToNewArticle = () => {
    this.setState({
      page: 'new-article'
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

  saveNewArticle = async ({title, content}) => {
    const {uid} = this.state;
    const {key} = await firebase.database().ref(`articles`).push({
      title,
      uid,
      createdAt: firebase.database.ServerValue.TIMESTAMP
    });
    await firebase.database().ref(`contents/${key}`).set(content);
    await this.fetchArticles();
    this.setState({
      page: 'list'
    });
  }

  viewArticle = async articleId => {
    const {uid} = this.state;
    const articleSnapshot = await firebase.database().ref(`/articles/${articleId}`).once('value');
    const articleData = articleSnapshot.val();
    const nickNamePromise = firebase.database().ref(`/users/${uid}/nickName`).once('value');
    const contentPromise = firebase.database().ref(`/contents/${articleId}`).once('value');
    const [nickNameSnapshot, contentSnapshot] = await Promise.all([nickNamePromise, contentPromise]);
    const author = nickNameSnapshot.val();
    const content = contentSnapshot.val();
    this.setState({
      page: 'article',
      article: {
        author,
        content,
        ...articleData
      }
    });
  }

  fetchArticles = async () => {
    const snapshot = await firebase.database().ref('/articles').once('value');
    console.log(snapshot);
    const articlesObj = snapshot.val();
    const articles = (
      articlesObj == null
      ? []
      : Object.entries(articlesObj).map(([articleId, article]) => ({
          articleId,
          ...article
        }))
    );

    // nickName 가져오기
    const uidSet = new Set(articles.map(a => a.uid));
    const uidPromises = Array.from(uidSet).map(async uid => {
      const nickNameSnapshot = await firebase.database().ref(`users/${uid}/nickName`).once(`value`);
      return [uid, nickNameSnapshot.val()];
    })
    const uidMapArr = await Promise.all(uidPromises);
    const uidMap = new Map(uidMapArr);
    articles.forEach(article => {
      article.author = uidMap.get(article.uid);
    });
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
            onNewArticleClick={this.pageToNewArticle}
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
          : page === 'new-article'
          ? <NewArticleScreen
            onFormSubmit={this.saveNewArticle}
            nickName={nickName} />
          : 'Loading...'
        }
      </div>
    )
  }
}
