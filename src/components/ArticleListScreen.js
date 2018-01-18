import React, {Component} from 'react';
import NavBar from './NavBar';

export default class ArticleListScreen extends Component {
  render() {
    const {uid} = this.props;
    return (
      <div>
        <NavBar uid={uid} />
        게시글 목록
      </div>
    )
  }
}
