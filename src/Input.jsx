import React, { Component, PropTypes } from 'react';
import set from 'lodash/set';
import get from 'lodash/get';
import omit from 'lodash/omit';
import cloneDeep from 'lodash/cloneDeep';

const initialState = {
  touched: false,
  dirty: false,
  valid: true,
};

function validate(required, customValidate, value) {
  if (!required && !value) {
    return true;
  }
  return !customValidate || (customValidate && customValidate(value));
}

function processValue(event, type) {
  switch (type) {
    case 'number':
      if (event.target.value !== '') {
        return parseInt(event.target.value, 10);
      }
      return event.target.value;
    case 'checkbox':
      return event.target.checked;
    default:
      return event.target.value;
  }
}

class AutoFormsInput extends Component {
  static propTypes = {
    model: PropTypes.string,
    // A React component instance.
    parent: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    validate: PropTypes.func,
    // Default HTML5 attributes.
    required: PropTypes.bool,
    type: PropTypes.string,
    value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
    // Input event callbacks.
    onFocus: PropTypes.func,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    model: '',
    parent: null,
    validate: () => true,
    required: false,
    type: 'text',
    value: '',
    onFocus: () => {},
    onChange: () => {},
  };

  constructor(props) {
    super(props);
    const state = cloneDeep(initialState);
    // Determine if initial state is valid.
    if (this.hasParent()) {
      const value = get(props.parent.state, props.model, '');
      state.valid = validate(props.required, props.validate, value);
    }
    this.state = state;
  }

  reset() {
    this.setState(initialState);
  }

  hasParent() {
    return this.props.parent && this.props.model;
  }

  render() {
    const ownProps = omit(this.props, ['model', 'parent', 'validate']);
    if (this.props.type === 'radio') {
      // Passthrough value for radio type.
      ownProps.checked = this.props.value === get(this.props.parent.state, this.props.model);
    } else if (this.props.type === 'checkbox') {
      ownProps.checked = get(this.props.parent.state, this.props.model, false);
    } else if (this.hasParent()) {
      // Retrieve value from parent state.
      ownProps.value = get(this.props.parent.state, this.props.model, '');
    }
    return (
      <input
        {...ownProps}
        onFocus={(event) => {
          this.props.onFocus(event);
          this.setState({
            touched: true,
          });
        }}
        onChange={(event) => {
          const newValue = processValue(event, this.props.type);

          if (this.hasParent()) {
            const newParentState = cloneDeep(this.props.parent.state);
            set(newParentState, this.props.model, newValue);
            this.props.parent.setState(newParentState);
          }

          this.setState({
            dirty: true,
            valid: validate(this.props.required, this.props.validate, newValue),
          }, () => {
            this.props.onChange(event);
          });
        }}
      />
    );
  }
}

export default AutoFormsInput;
