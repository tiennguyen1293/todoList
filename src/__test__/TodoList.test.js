import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import TodoList from '../pages/TodoList';

describe('TodoList', () => {
  it('should show message No Result', () => {
    const { getByTestId } = render(<TodoList />, {
      wrapper: MemoryRouter,
    });
    const noResult = getByTestId('no-result');
    expect(noResult.textContent).toBe('No Result');
  });

  it('prevent user Enter when value is null', () => {
    const { getByTestId } = render(<TodoList />, {
      wrapper: MemoryRouter,
    });

    fireEvent.change(getByTestId('input-add-todo'), {
      target: {
        value: '',
      },
    });
    expect(getByTestId('input-add-todo').value).toBe('');

    fireEvent.keyDown(getByTestId('input-add-todo'), {
      key: 'Enter',
      code: 13,
    });

    expect(getByTestId('input-add-todo').value).toBe('');
    expect(getByTestId('no-result').textContent).toBe('No Result');
  });

  it('should add todoItem when user Enter', () => {
    const { getByTestId } = render(<TodoList />, {
      wrapper: MemoryRouter,
    });

    fireEvent.change(getByTestId('input-add-todo'), {
      target: {
        value: '123',
      },
    });
    expect(getByTestId('input-add-todo').value).toBe('123');

    fireEvent.keyDown(getByTestId('input-add-todo'), {
      key: 'Enter',
      code: 13,
    });

    expect(getByTestId('input-add-todo').value).toBe('');
    expect(getByTestId('todo-item').textContent).toBe('123×');
    expect(getByTestId('todo-list').children.length).toBe(1);
  });

  it('should add todoItem when user Enter', () => {
    const { getByTestId } = render(<TodoList />, {
      wrapper: MemoryRouter,
    });

    fireEvent.change(getByTestId('input-add-todo'), {
      target: {
        value: '123',
      },
    });
    expect(getByTestId('input-add-todo').value).toBe('123');

    fireEvent.keyDown(getByTestId('input-add-todo'), {
      key: 'Enter',
      code: 13,
    });

    expect(getByTestId('input-add-todo').value).toBe('');
    expect(getByTestId('todo-item').textContent).toBe('123×');
    expect(getByTestId('todo-list').children.length).toBe(1);

    fireEvent.change(getByTestId('input-add-todo'), {
      target: {
        value: '321',
      },
    });
    expect(getByTestId('input-add-todo').value).toBe('321');
    fireEvent.keyDown(getByTestId('input-add-todo'), {
      key: 'Enter',
      code: 13,
    });
    expect(getByTestId('input-add-todo').value).toBe('');
    expect(getByTestId('todo-list').children.length).toBe(2);
  });

  it('should switch status when user click in the task', () => {
    const { getByTestId, getByText } = render(<TodoList />, {
      wrapper: MemoryRouter,
    });
    const inputAddTodo = getByTestId('input-add-todo');

    fireEvent.change(inputAddTodo, {
      target: {
        value: '123',
      },
    });
    fireEvent.keyDown(inputAddTodo, {
      key: 'Enter',
      code: 13,
    });

    fireEvent.change(inputAddTodo, {
      target: {
        value: '321',
      },
    });
    fireEvent.keyDown(inputAddTodo, {
      key: 'Enter',
      code: 13,
    });

    expect(getByTestId('todo-list').children.length).toBe(2);
    fireEvent.click(getByText('123'));
    expect(getByText('123')).toHaveStyle('text-decoration: line-through');
    expect(getByText('321')).not.toHaveStyle('text-decoration: line-through');

    fireEvent.click(getByText('123'));
    expect(getByText('123')).not.toHaveStyle('text-decoration: line-through');
  });

  it('should toggle status when user click on ToggleAll', () => {
    const { getByTestId, getAllByTestId } = render(<TodoList />, {
      wrapper: MemoryRouter,
    });
    const inputAddTodo = getByTestId('input-add-todo');

    fireEvent.change(inputAddTodo, {
      target: {
        value: '123',
      },
    });
    fireEvent.keyDown(inputAddTodo, {
      key: 'Enter',
      code: 13,
    });
    fireEvent.change(inputAddTodo, {
      target: {
        value: '321',
      },
    });
    fireEvent.keyDown(inputAddTodo, {
      key: 'Enter',
      code: 13,
    });

    expect(getByTestId('todo-list').children.length).toBe(2);
    fireEvent.click(getByTestId('toggle-all'));
    getAllByTestId('todo-item__title').forEach(item => {
      expect(item).toHaveStyle('text-decoration: line-through');
    });

    fireEvent.click(getByTestId('toggle-all'));
    getAllByTestId('todo-item__title').forEach(item => {
      expect(item).not.toHaveStyle('text-decoration: line-through');
    });
  });

  it('should filter ACTIVE status when user click on Active button', async () => {
    const { getByTestId, getByText } = render(<TodoList />, {
      wrapper: MemoryRouter,
    });
    const inputAddTodo = getByTestId('input-add-todo');

    fireEvent.change(inputAddTodo, {
      target: {
        value: '123',
      },
    });
    fireEvent.keyDown(inputAddTodo, {
      key: 'Enter',
      code: 13,
    });

    fireEvent.change(inputAddTodo, {
      target: {
        value: '321',
      },
    });
    fireEvent.keyDown(inputAddTodo, {
      key: 'Enter',
      code: 13,
    });

    expect(getByTestId('todo-list').children.length).toBe(2);
    fireEvent.click(getByText('123'));
    expect(getByText('123')).toHaveStyle('text-decoration: line-through');
    expect(getByText('321')).not.toHaveStyle('text-decoration: line-through');

    fireEvent.click(getByTestId('active-button'));
    expect(getByTestId('todo-list').children.length).toBe(1);

    fireEvent.click(getByText('321'));
    expect(getByTestId('no-result').textContent).toBe('No Result');
  });

  it('should filter DONE status when user click on Done button', async () => {
    const { getByTestId, getByText, getAllByTestId } = render(<TodoList />, {
      wrapper: MemoryRouter,
    });
    const inputAddTodo = getByTestId('input-add-todo');

    fireEvent.change(inputAddTodo, {
      target: {
        value: '123',
      },
    });
    fireEvent.keyDown(inputAddTodo, {
      key: 'Enter',
      code: 13,
    });

    fireEvent.change(inputAddTodo, {
      target: {
        value: '321',
      },
    });
    fireEvent.keyDown(inputAddTodo, {
      key: 'Enter',
      code: 13,
    });

    fireEvent.click(getByTestId('active-button'));
    expect(getByTestId('todo-list').children.length).toBe(2);
    fireEvent.click(getByTestId('toggle-all'));
    expect(getByTestId('no-result').textContent).toBe('No Result');

    fireEvent.click(getByTestId('done-button'));
    getAllByTestId('todo-item').forEach(item => {
      expect(item).toHaveAttribute('data-status', 'DONE');
    });

    const todoItemTitleFirst = getByText('123');
    fireEvent.click(todoItemTitleFirst);
    expect(getAllByTestId('todo-item')).toHaveLength(1);
  });

  it('should have a scroll when more than 5 task', async () => {
    const { getByTestId } = render(<TodoList />, {
      wrapper: MemoryRouter,
    });
    const inputAddTodo = getByTestId('input-add-todo');

    fireEvent.change(inputAddTodo, {
      target: {
        value: '123',
      },
    });
    fireEvent.keyDown(inputAddTodo, {
      key: 'Enter',
      code: 13,
    });

    fireEvent.change(inputAddTodo, {
      target: {
        value: '321',
      },
    });
    fireEvent.keyDown(inputAddTodo, {
      key: 'Enter',
      code: 13,
    });

    expect(getByTestId('todo-list').children.length).toBe(2);
    fireEvent.change(inputAddTodo, {
      target: {
        value: 'abc',
      },
    });
    fireEvent.keyDown(inputAddTodo, {
      key: 'Enter',
      code: 13,
    });
    fireEvent.change(inputAddTodo, {
      target: {
        value: 'cba',
      },
    });
    fireEvent.keyDown(inputAddTodo, {
      key: 'Enter',
      code: 13,
    });
    fireEvent.change(inputAddTodo, {
      target: {
        value: 'cccc',
      },
    });
    fireEvent.keyDown(inputAddTodo, {
      key: 'Enter',
      code: 13,
    });

    expect(getByTestId('todo-list').children.length).toBe(5);
    expect(getByTestId('todo-list')).toHaveAttribute('data-scroll', 'true');
  });
});
