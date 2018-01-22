import React, {Component} from 'react';
import NavBar from './NavBar';

export default class ArticleScreen extends Component {
  render() {
    const {title, content, nickName, onNickNameClick} = this.props;
    return (
      <div>
        <NavBar nickName={nickName} onNickNameClick={onNickNameClick} />
        <div>
          {title}
        </div>
        <div>
          {content}
        </div>
      </div>
    )
  }
}
