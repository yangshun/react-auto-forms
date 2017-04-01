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

function processValue(value, type) {
  switch (type) {
    case 'number':
      if (value !== '') {
        return parseInt(value, 10);
      }
      return value;
    default:
      return value;
  }
}

class AutoInput extends Component {
  static propTypes = {
    model: PropTypes.string.isRequired,
    // A React component instance.
    parent: PropTypes.object.isRequired,  // eslint-disable-line react/forbid-prop-types
    validate: PropTypes.func,
    // Default HTML5 attributes.
    required: PropTypes.bool,
    type: PropTypes.string,
    // Input event callbacks.
    onFocus: PropTypes.func,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    validate: () => true,
    required: false,
    type: 'text',
    onFocus: () => {},
    onChange: () => {},
  };

  constructor(props) {
    super(props);
    const state = cloneDeep(initialState);
    const value = get(props.parent.state, props.model, '');
    state.valid = validate(props.required, props.validate, value);
    this.state = state;
  }

  reset() {
    this.setState(initialState);
  }

  render() {
    const value = get(this.props.parent.state, this.props.model, '');
    const ownProps = omit(this.props, ['model', 'parent', 'validate']);
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
          const newParentState = cloneDeep(this.props.parent.state);
          const newValue = processValue(event.target.value, this.props.type);
          set(newParentState, this.props.model, newValue);
          this.props.parent.setState(newParentState);

          this.setState({
            dirty: true,
            valid: validate(this.props.required, this.props.validate, newValue),
          }, () => {
            this.props.onChange(event);
          });
        }}
        value={value}
      />
    );
  }
}

export default AutoInput;
