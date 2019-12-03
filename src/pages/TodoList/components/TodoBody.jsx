import React from 'react';
import styled from 'styled-components';

import { MAX_ITEM } from 'contants';

import TodoItem from 'commons/TodoItem/TodoItem';

const TableBody = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 16px;

  ${props =>
    props.isScroll
      ? `
        height: ${props.height}px;
        overflow: auto;
      `
      : ''}
`;

const TableRow = styled.li`
  width: 100%;
`;

const TodoBody = ({
  todoList,
  handleRemoveTodo,
  handleEditTodo,
  todoItemRef,
  heightTableBody,
}) => {
  return (
    <TableBody isScroll={todoList.length >= MAX_ITEM} height={heightTableBody}>
      {todoList.length > 0
        ? todoList.map(todo => (
            <TableRow key={todo.id}>
              <TodoItem
                todoItemRef={todoItemRef}
                model={todo}
                handleRemoveTodo={idTodo => handleRemoveTodo(idTodo)}
                handleEditTodo={todo => handleEditTodo(todo)}
              />
            </TableRow>
          ))
        : 'No Result'}
    </TableBody>
  );
};

export default TodoBody;
