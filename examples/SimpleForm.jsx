import React, { Component } from 'react';

import AutoForms from '../src';

class SimpleForm extends Component {
  state = {
    name: 'John Doe',
    age: 21,
    password: 'qwerty',
    email: 'john.doe@example.com',
    wearsGlasses: false,
    gender: 'male',
  }

  render() {
    return (
      <div>
        <p>My name is {this.state.name}, I am {this.state.age} years old.</p>
        <label htmlFor="name">Name</label>
        <AutoForms.Input
          id="name"
          type="text"
          model="name"
          parent={this}
        />
        <br/>
        <label htmlFor="age">Age</label>
        <AutoForms.Input
          id="age"
          type="number"
          model="age"
          parent={this}
        />
        <br/>
        <label htmlFor="password">Password</label>
        <AutoForms.Input
          id="password"
          type="password"
          model="password"
          parent={this}
        />
        <br/>
        <label htmlFor="email">Email</label>
        <AutoForms.Input
          id="email"
          type="email"
          model="email"
          parent={this}
        />
        <br/>
        <label htmlFor="wears-glasses">
          <AutoForms.Input
            id="wears-glasses"
            type="checkbox"
            model="wearsGlasses"
            parent={this}
          />
          Wears Glasses
        </label>
        <br/>
        <div>
          <label>
            <AutoForms.Input
              id="gender-ratio-male"
              type="radio"
              name="gender"
              value="male"
              model="gender"
              parent={this}
            />
            Male
          </label>
        </div>
        <div>
          <label>
            <AutoForms.Input
              id="gender-ratio-female"
              type="radio"
              name="gender"
              value="female"
              model="gender"
              parent={this}
            />
            Female
          </label>
        </div>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }
}

export default SimpleForm;
