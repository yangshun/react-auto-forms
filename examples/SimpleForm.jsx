import React, { Component } from 'react';

import AutoInput from '../src';

class SimpleForm extends Component {
  state = {
    name: 'John Doe',
    age: 21,
  }

  render() {
    return (
      <div>
        <p>My name is {this.state.name}, I am {this.state.age} years old.</p>
        <label htmlFor="name">Name</label>
        <AutoInput
          id="name"
          model="name"
          parent={this}
        />
        <label htmlFor="age">Age</label>
        <AutoInput
          id="age"
          model="age"
          parent={this}
          type="number"
        />
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }
}

export default SimpleForm;
