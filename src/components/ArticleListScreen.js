import React, {Component} from 'react';
import styled from 'styled-components';

import NavBar from './NavBar';

const ArticleItem = styled.div`
  color: green;
  cursor: pointer;
`;

export default class ArticleListScreen extends Component {
  handleArticleItemClick = articleId => {
    this.props.onArticleItemClick && this.props.onArticleItemClick(articleId);
  }
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
              <ArticleItem
                key={articleId}
                onClick={() => this.handleArticleItemClick(articleId)}
              >{`${createdAt} - ${title} - ${content}`}</ArticleItem>
            ))
            : '게시글이 없습니다.'
          }
        </div>
      </div>
    )
  }
}
