import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';

import AutoInput from '../src';

import SimpleForm from '../examples/SimpleForm';
import NestedStateForm from '../examples/NestedStateForm';

storiesOf('AutoInput', module)
  .add('Simple', () => <SimpleForm />)
  .add('Nested State', () => <NestedStateForm />);
