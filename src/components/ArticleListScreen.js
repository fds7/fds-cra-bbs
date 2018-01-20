import React, {Component} from 'react';
import styled from 'styled-components';

import NavBar from './NavBar';

const ArticleItem = styled.div`
  color: green;
  cursor: pointer;
`;

const NewArticleButton = styled.button`
  background-color: skyblue;
`

export default class ArticleListScreen extends Component {
  handleArticleItemClick = articleId => {
    this.props.onArticleItemClick && this.props.onArticleItemClick(articleId);
  }
  render() {
    const {
      nickName,
      articles,
      onNickNameClick,
      onNewArticleClick,
    } = this.props;
    return (
      <div>
        <NavBar nickName={nickName} onNickNameClick={onNickNameClick} />
        <NewArticleButton onClick={onNewArticleClick}>새 게시글</NewArticleButton>
        <div>
          {
            articles == null
            ? 'Loading...'
            : articles.length > 0
            ? articles.map(({title, author, createdAt, articleId}) => (
              <ArticleItem
                key={articleId}
                onClick={() => this.handleArticleItemClick(articleId)}
              >{`${createdAt} - ${author} - ${title}`}</ArticleItem>
            ))
            : '게시글이 없습니다.'
          }
        </div>
      </div>
    )
  }
}
