import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import InputBase from '../commons/Input/InputBase';

describe('InputBase', () => {
  it('render', () => {
    const { container } = render(
      <InputBase placeholder="placeholder" value="123" type="text" />,
    );
    const input = container.firstChild;
    expect(input.placeholder).toEqual('placeholder');
    expect(input.value).toEqual('123');
    expect(input.type).toEqual('text');
  });

  it('onChange', () => {
    const onChange = jest.fn();
    const { container } = render(<InputBase onChange={onChange} />);
    const input = container.firstChild;
    fireEvent.change(input, {
      target: {
        value: '123',
      },
    });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('onKeyDown', () => {
    const onKeyDown = jest.fn();
    const { container } = render(<InputBase onKeyDown={onKeyDown} />);
    const input = container.firstChild;
    fireEvent.keyDown(input, {
      key: 'Enter',
      code: 13,
    });
    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });
});
