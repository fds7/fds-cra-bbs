import React, {Component} from 'react';
import styled from 'styled-components';
import NavBar from './NavBar';

const Title = styled.h1``;

const Content = styled.pre`
  font-family: sans-serif;
  white-space: pre-wrap;
`;

export default class ArticleScreen extends Component {

  render() {
    const {author, title, content, createdAt, nickName, onNickNameClick} = this.props;
    return (
      <div>
        <NavBar nickName={nickName} onNickNameClick={onNickNameClick}/>
        <div>{author}</div>
        <Title>{title}</Title>
        <div>{createdAt}</div>
        <Content>{content}</Content>
      </div>
    );
  }
}
