import React from 'react'
import BaseComponent from '../BaseComponent';

class Idea extends BaseComponent {

  handleClick = () => {
    this.props.enableEditing(this.props.idea.id);
  }

  render() {
    return (
      <div className="tile">
        <h4 onClick={this.handleClick}>
          {this.props.idea.title}
        </h4>
        <p onClick={this.handleClick}>
          {this.props.idea.body}
        </p>
      </div>
    );
  }
}

export default Idea
