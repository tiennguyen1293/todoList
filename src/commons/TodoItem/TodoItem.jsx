import React from 'react';
import styled from 'styled-components';

import { STATUS } from 'utils/contants';

import Button from 'commons/Button/Button';

const WrapperTodoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 4px 0;
`;

const TitleTodo = styled.span`
  flex: 1;
  display: inline-block;
  font-size: ${props => props.theme.fontSize};
  color: ${props => props.theme.secondary};
  padding: 10px 4px;
  cursor: pointer;

  ${props =>
    props.isDone &&
    `
      color: ${props.theme.red};
      text-decoration: line-through
    `};
`;

class TodoItem extends React.PureComponent {
  render() {
    const { todoItemRef, model, handleEditTodo, handleRemoveTodo } = this.props;

    return (
      <WrapperTodoItem
        ref={todoItemRef}
        data-status={model.status}
        data-testid="todo-item"
      >
        <TitleTodo
          data-testid="todo-item__title"
          isDone={model.status === STATUS.DONE}
          onClick={() => handleEditTodo(model)}
        >
          {model.title}
        </TitleTodo>
        <Button
          data-testid="todo-item__remove"
          type="button"
          onClick={() => handleRemoveTodo(model.id)}
        >
          ×
        </Button>
      </WrapperTodoItem>
    );
  }
}

export default TodoItem;
