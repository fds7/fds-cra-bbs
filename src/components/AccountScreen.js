import React, {Component} from 'react';
import styled from 'styled-components';

import NavBar from './NavBar';

const Wrap = styled.div``;

const Form = styled.form`
  margin: 20px auto;
  width: 500px;
`;

const Label = styled.label`
  color: blue;
`;

const NickNameInput = styled.input.attrs({
  type: 'text'
})`
  display: block;
  border: 1px solid silver;
  padding: 1em;
  font-size: 1em;
  outline: none;

  &:disabled {
    color: silver;
  }
`;

const SaveButton = styled.button.attrs({
  type: 'submit'
})`
  padding: 1em;
  background-color: skyblue;
  color: white;

  &:disabled {
    background-color: silver;
  }
`;

export default class AccountScreen extends Component {
  state = {
    formDisabled: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      formDisabled: true
    });
    const data = {};
    for (const [name, value] of new FormData(e.target)) {
      data[name] = value;
    }
    this.props.onFormSubmit && this.props.onFormSubmit(data);
  }
  render() {
    const {nickName} = this.props;
    const {formDisabled} = this.state;
    return (
      <Wrap>
        <NavBar nickName={nickName} />
        <Form onSubmit={this.handleSubmit}>
          <fieldset disabled={formDisabled}>
            <Label>
              별명
              <NickNameInput name="nickName" />
            </Label>
            <SaveButton>저장</SaveButton>
          </fieldset>
        </Form>
      </Wrap>
    );
  }
}
