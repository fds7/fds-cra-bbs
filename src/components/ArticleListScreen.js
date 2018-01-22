import React, {Component} from 'react';
import {Table} from 'semantic-ui-react';
import styled from 'styled-components';
import NavBar from './NavBar';

const mockData = [
  {
    articleId: '-LB1',
    author: '김승하',
    title: '게시글 제목 1',
    createdAt: '2018-01-20'
  },
  {
    articleId: '-LB2',
    author: '김승하',
    title: '게시글 제목 2',
    createdAt: '2018-01-20'
  }
]

const ArticleItemRow = styled(Table.Row)`
  &:hover {
    cursor: pointer;
    background-color: skyblue;
  }
`;

export default class ArticleListScreen extends Component {
  render() {
    const {nickName, onNickNameClick} = this.props;
    return (
      <div>
        <NavBar nickName={nickName} onNickNameClick={onNickNameClick} />
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>작성자</Table.HeaderCell>
              <Table.HeaderCell>제목</Table.HeaderCell>
              <Table.HeaderCell>작성일</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              mockData.map(({articleId, title, author, createdAt}) => (
                <ArticleItemRow key={articleId}>
                  <Table.Cell>{author}</Table.Cell>
                  <Table.Cell>{title}</Table.Cell>
                  <Table.Cell>{createdAt}</Table.Cell>
                </ArticleItemRow>
              ))
            }
          </Table.Body>
        </Table>
      </div>
    )
  }
}
