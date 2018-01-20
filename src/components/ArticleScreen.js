import React, {Component} from 'react';
import styled from 'styled-components';
import * as moment from 'moment';
import 'moment/locale/ko';

import NavBar from './NavBar';
import MainWrap from './MainWrap';

const Title = styled.h1``;

const Content = styled.pre`
  font-family: sans-serif;
  white-space: pre-wrap;
`;

export default class ArticleScreen extends Component {

  render() {
    const {
      author,
      title,
      content,
      createdAt,
      nickName,
      onNickNameClick,
      onLogoClick
    } = this.props;
    return (
      <div>
        <NavBar
          nickName={nickName}
          onNickNameClick={onNickNameClick}
          onLogoClick={onLogoClick} />
        <MainWrap>
          <Title>{title}</Title>
          <div>{author}</div>
          <div>{moment(createdAt).locale('ko').fromNow()}</div>
          <Content>{content}</Content>
        </MainWrap>
      </div>
    );
  }
}
