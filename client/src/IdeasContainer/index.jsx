import React from 'react';
import BaseComponent from '../BaseComponent';
import $ from 'jquery';
import './index.css';
import Idea from './ideaItem';
import IdeaForm from './ideaForm';
import update from 'immutability-helper';

class IdeasContainer extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {
      ideas: [],
      editingIdeaId: null,
    };
  }

  componentDidMount() {
    $.ajax({
      url: 'http://localhost:3001/api/v1/ideas.json',
      dataType: 'json',
      cache: false,
      success: (response) => {
        this.setState({
          ideas: response.data
        });

      },
      error: (xhr, status, err) => {
        console.log('false');
      }
    });
  }

  addNewIdea = () => {
    let data = {"idea": {"title": "go to market", "body": "Prepare for year and party"}}
    $.ajax({
      url: 'http://localhost:3001/api/v1/ideas',
      method: 'POST',
      data: data,
      success: (response) => {
        const ideas = update(this.state.ideas, {
          $splice: [[0, 0, response.data.idea]]
        })
        this.setState({
          ideas: ideas,
          editingIdeaId: response.data.idea.id,
        })
        //We make a new copy of this.state.ideas and use the $splice command to insert the new idea (in response.data) at the 0th index of this array.
      },
      error: (xhr, status, err) => {
        console.log('false');
      }
    });
  }

  updateIdea = (idea) => {
    let ideaIndex = this.state.ideas.findIndex(x => x.id === idea.id)
    let ideas = update(this.state.ideas, {
      [ideaIndex]: { $set: idea }
    })
    this.setState({ideas: ideas})
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Idea Board</h1>
        </div>
        <button className="newIdeaButton" onClick={this.addNewIdea} >
          New Idea
        </button>
        <div>
          {this.state.ideas.map((idea) => {
            if (idea.id === this.state.editingIdeaId) {
              return (<IdeaForm idea={idea} key={idea.id} updateIdea={this.updateIdea}/>)
            } else {
              return (<Idea idea={idea} key={idea.id} />)
            }
          })}
        </div>
      </div>
    )
  }
}

export default IdeasContainer
