import React, { useState } from 'react';
import styled from 'styled-components';

const InputSearch = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid ${props => props.theme.secondary};
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.secondary};
`;

function InputBaseComponent(props) {
  const { type, placeholder, onSubmit, onKeyDown, onChange } = props;

  const [todoNameCurrent, setTodoName] = useState('');

  const handleKeyDown = e => {
    if (e.key === 'Enter' && typeof onSubmit === 'function') {
      onSubmit(todoNameCurrent);
      setTodoName('');
    }
    onKeyDown && onKeyDown(e);
  };

  const handleChange = value => {
    typeof onChange === 'function' && onChange(value);
    setTodoName(value);
  };

  return (
    <InputSearch
      type={type}
      placeholder={placeholder}
      onKeyDown={e => handleKeyDown(e)}
      onChange={e => handleChange(e.target.value)}
      value={todoNameCurrent}
      {...props}
    />
  );
}

export default InputBaseComponent;
