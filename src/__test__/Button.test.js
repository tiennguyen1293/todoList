import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Button from '../commons/Button/Button';

describe('Button', () => {
  it('render', () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <Button type="button" onClick={onClick}>
        Button Base
      </Button>,
    );
    fireEvent.click(getByText('Button Base'));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(getByText('Button Base').type).toEqual('button');
  });

  it('disabled', () => {
    const { getByText } = render(<Button disabled>Button Base</Button>);
    expect(getByText('Button Base')).toHaveAttribute('disabled', '');
    expect(getByText('Button Base')).toHaveStyle(`
      opacity: 0.7;
      user-select: none;
      pointer-events: none;
    `);
  });
});
