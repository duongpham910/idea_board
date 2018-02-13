import React from 'react';
import BaseComponent from '../BaseComponent';
import $ from 'jquery';

class IdeaForm extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.idea.id,
      title: this.props.idea.title,
      body: this.props.idea.body
    };
  }

  handleInput = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleBlur = () => {
    let data = {idea: {title: this.state.title, body: this.state.body}}
    $.ajax({
      url: `http://localhost:3001/api/v1/ideas/${this.state.id}`,
      method: 'PATCH',
      data: data,
      success: (response) => {
        console.log(response)
      },
      error: (xhr, status, err) => {
        console.log('false');
      }
    });
  }

  render() {
    return(
      <div className="tile">
        <form onBlur={this.handleBlur}>
          <input className='input' type="text"
            name="title" placeholder='Enter a Title'
            value={this.state.title} onChange={this.handleInput}/>
          <textarea className='input' name="body"
            placeholder='Describe your idea'
            value={this.state.body} onChange={this.handleInput}></textarea>
        </form>
      </div>
    );
  }
}

export default IdeaForm
