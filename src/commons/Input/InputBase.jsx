import React, { useState } from 'react';
import styled from 'styled-components';

const InputSearch = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.secondary};
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.secondary};
`;

function InputBaseComponent(props) {
  const { type, placeholder, onSubmit, onKeyDown, onChange } = props;

  const [value, setValueInput] = useState('');

  const handleKeyDown = e => {
    if (e.key === 'Enter' && typeof onSubmit === 'function') {
      onSubmit(value);
      setValueInput('');
    }
    onKeyDown && onKeyDown(e);
  };

  const handleChange = value => {
    typeof onChange === 'function' && onChange(value);
    setValueInput(value);
  };

  return (
    <InputSearch
      data-testid="input"
      type={type}
      placeholder={placeholder}
      onKeyDown={e => handleKeyDown(e)}
      onChange={e => handleChange(e.target.value)}
      value={value}
      {...props}
    />
  );
}

export default InputBaseComponent;
