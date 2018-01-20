import React, {Component} from 'react';
import styled from 'styled-components';

import NavBar from './NavBar';

const ArticleForm = styled.form`
  padding: 1em;
`;

const Label = styled.label`
  display: block;
  color: blue;
  &:not(:first-child) {
    margin-top: 1em;
  }
`;

const TitleInput = styled.input`
  font-size: 1em;
`;

const ContentTextArea = styled.textarea`
  font-size: 1em;
`;

const SubmitButton = styled.button.attrs({
  type: 'submit'
})`
  background-color: skyblue;
`;

export default class NewArticleScreen extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const data = {};
    for (const [name, value] of new FormData(e.target)) {
      data[name] = value;
    }
    this.props.onFormSubmit && this.props.onFormSubmit(data);
  }
  handleKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }
  render() {
    const {nickName, onNickNameClick} = this.props;
    return (
      <div>
        <NavBar nickName={nickName} onNickNameClick={onNickNameClick} />
        <ArticleForm onSubmit={this.handleSubmit}>
          <fieldset>
            <Label>
              제목
              <TitleInput name="title" onKeyPress={this.handleKeyPress} />
            </Label>
            <Label>
              내용
              <ContentTextArea name="content" />
            </Label>
            <SubmitButton>저장</SubmitButton>
          </fieldset>
        </ArticleForm>
      </div>
    );
  }
}
