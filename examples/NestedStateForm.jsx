import React, { Component } from 'react';

import AutoForms from '../src';

class SimpleForm extends Component {
  state = {
    name: 'John Doe',
    age: 21,
    dog: {
      name: 'Max',
      age: 5,
    },
  }

  render() {
    return (
      <div>
        <p>My name is {this.state.name}, I am {this.state.age} years old.</p>
        <label htmlFor="name">Name</label>
        <AutoForms.Input
          id="name"
          model="name"
          parent={this}
        />
        <br/>
        <label htmlFor="age">Age</label>
        <AutoForms.Input
          id="age"
          model="age"
          parent={this}
          type="number"
        />
        <br/>
        <label htmlFor="dog-name">Dog's Name</label>
        <AutoForms.Input
          id="dog-name"
          model="dog.name"
          parent={this}
        />
        <br/>
        <label htmlFor="dog-age">Dog's Age</label>
        <AutoForms.Input
          id="dog-age"
          model="dog.age"
          parent={this}
          type="number"
        />
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }
}

export default SimpleForm;
