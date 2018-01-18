import React, {Component} from 'react';
import NavBar from './NavBar';

export default class ArticleListScreen extends Component {
  render() {
    const {uid, onNickNameClick} = this.props;
    return (
      <div>
        <NavBar uid={uid} onNickNameClick={onNickNameClick} />
        게시글 목록
      </div>
    )
  }
}
