import React from 'react';
import { mount } from 'enzyme';

import SimpleForm from '../examples/SimpleForm';

describe('<SimpleForm />', () => {
  it('should render', () => {
    const wrapper = mount(<SimpleForm />); // eslint-disable-line
  });
});
