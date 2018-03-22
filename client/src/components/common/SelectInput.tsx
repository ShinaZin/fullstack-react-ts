import * as React from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import PropTypes from 'prop-types';

interface SelectInputProps {
  error?: string;
  value: number;
  name: string;
  label: string;
  onChange: (name, value) => any;
  placeholder?: string;
  options?: any[];
}

class SelectInput extends React.Component<SelectInputProps> {
  render() {
    let {error, value, name, label, onChange, options} = this.props;

    let inputOnChange = event => {
      onChange(name, event.target.value);
    };

    return (
      <div>
        <FormGroup controlId={name}>
          <ControlLabel>{label}</ControlLabel>

          <FormControl componentClass="select" onChange={inputOnChange} value={value}>
            {!value && <option value="select">Select Category</option>}

            {options.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </FormControl>
        </FormGroup>

        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default SelectInput;
