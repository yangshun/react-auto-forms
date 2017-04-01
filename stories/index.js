import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';
import AutoInput from '../src';
import SimpleForm from '../examples/SimpleForm';

storiesOf('AutoInput', module)
  .add('default', () => <SimpleForm />);
