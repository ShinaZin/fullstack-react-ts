import * as React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

interface TextInputProps {
  name: string;
  label: string;
  onChange: (name, value) => any;
  placeholder?: string;
  value?: number;
  error?: string;
  rows?: number;
}

class TextInput extends React.Component<TextInputProps> {
  render() {
    let {error, value, name, label, placeholder, rows} = this.props;

    let wrapperClass = classnames({
      'form-group': true,
      'has-error': error && error.length > 0
    });

    let inputOnChange = event => {
      this.props.onChange(event.target.name, event.target.value);
    };

    if (!rows) rows = 3;

    return (
      <div className={wrapperClass}>
        <label htmlFor={name}>{label}</label>
        <div className="field">
          <textarea
            name={name}
            rows={rows}
            className="form-control"
            placeholder={placeholder}
            value={value ? value : ''}
            onChange={inputOnChange}
          />
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
      </div>
    );
  }
}

export default TextInput;
