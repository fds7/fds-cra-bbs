import React, {Component} from 'react';
import styled from 'styled-components';
import {Table} from 'semantic-ui-react';
import * as moment from 'moment';
import 'moment/locale/ko';

import NavBar from './NavBar';
import MainWrap from './MainWrap';

const NewArticleButton = styled.button`
  background-color: skyblue;
  padding: 1em;
  color: white;
  font-size: 1em;
`;

const ArticleItemRow = styled(Table.Row)`
  cursor: pointer;
  &:hover {
    background-color: skyblue;
  }
`;

const ArticleTable = styled(Table)`
  margin-top: 20px;
`;

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
      onLogoClick
    } = this.props;
    return (
      <div>
        <NavBar
          nickName={nickName}
          onNickNameClick={onNickNameClick}
          onLogoClick={onLogoClick} />
        <MainWrap>
          <div>
            <NewArticleButton onClick={onNewArticleClick}>
              새 게시글
            </NewArticleButton>
          </div>
          {
            articles == null
            ? 'Loading...'
            : articles.length > 0
            ? (
              <ArticleTable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>작성자</Table.HeaderCell>
                    <Table.HeaderCell>제목</Table.HeaderCell>
                    <Table.HeaderCell>작성일</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {
                    articles.map(({title, author, createdAt, articleId}) => (
                      <ArticleItemRow key={articleId} onClick={() => this.handleArticleItemClick(articleId)}>
                        <Table.Cell>
                          {author}
                        </Table.Cell>
                        <Table.Cell>
                          {title}
                        </Table.Cell>
                        <Table.Cell>
                          {moment(createdAt).locale('ko').fromNow()}
                        </Table.Cell>
                      </ArticleItemRow>
                    ))
                  }
                </Table.Body>
              </ArticleTable>
            )
            : '게시글이 없습니다.'
          }
        </MainWrap>
      </div>
    );
  }
}
