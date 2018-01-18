import React, {Component} from 'react';
import styled from 'styled-components';

const Wrap = styled.div``;

export default class AccountScreen extends Component {
  render() {
    return (
      <Wrap>
        <input type="text" />
        <button>저장</button>
      </Wrap>
    )
  }
}
