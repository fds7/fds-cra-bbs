import React, {Component} from 'react';
import styled from 'styled-components';
import NavBar from './NavBar';

const Title = styled.h1``;

export default class ArticleScreen extends Component {

  render() {
    const {author, title, content, createdAt, nickName} = this.props;
    return (
      <div>
        <NavBar nickName={nickName} />
        <div>{author}</div>
        <Title>{title}</Title>
        <div>{createdAt}</div>
        <div>{content}</div>
      </div>
    );
  }
}
