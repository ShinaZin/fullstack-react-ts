import * as React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

interface NumberInputProps {
  error: string;
  value: number;
  name: string;
  label: string;
  onChange: (name, value) => any;
  placeholder?: string;
}

class NumberInput extends React.Component<NumberInputProps> {
  render() {
    let {error, value, name, label} = this.props;

    let wrapperClass = classnames({
      'form-group': true,
      'has-error': error && error.length > 0
    });

    let inputOnChange = event => {
      this.props.onChange(event.target.name, event.target.value);
    };

    return (
      <div className={wrapperClass}>
        <label htmlFor={name}>{label}</label>
        <div className="field">
          <input
            type="number"
            name={name}
            className="form-control"
            min="0"
            step="0.01"
            value={value ? value : 0.0}
            onChange={inputOnChange}
          />
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
      </div>
    );
  }
}

export default NumberInput;
