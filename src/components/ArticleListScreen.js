import React, {Component} from 'react';
import NavBar from './NavBar';

export default class ArticleListScreen extends Component {
  render() {
    const {nickName, onNickNameClick, articles} = this.props;
    return (
      <div>
        <NavBar nickName={nickName} onNickNameClick={onNickNameClick} />
        <div>
          {
            articles == null
            ? 'Loading...'
            : articles.length > 0
            ? articles.map(({title, content, createdAt, articleId}) => (
              <div key={articleId}>{`${createdAt} - ${title} - ${content}`}</div>
            ))
            : '게시글이 없습니다.'
          }
        </div>
      </div>
    )
  }
}
