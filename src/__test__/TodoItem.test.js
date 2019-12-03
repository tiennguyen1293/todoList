import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import TodoItem from '../commons/TodoItem/TodoItem';

describe('TodoItem', () => {
  it('render', () => {
    const onClick = jest.fn();
    const onDelete = jest.fn();
    const { getByText } = render(
      <TodoItem
        model={{
          title: '123',
          id: '1',
          status: 'ACTIVE',
        }}
        onClickTitle={onClick}
        onDelete={onDelete}
      />,
    );
    fireEvent.click(getByText('123'));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(getByText('123').textContent).toEqual('123');

    fireEvent.click(getByText('×'));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
