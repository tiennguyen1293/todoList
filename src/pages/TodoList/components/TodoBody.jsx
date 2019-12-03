import React from 'react';
import styled from 'styled-components';

import TodoItem from 'commons/TodoItem/TodoItem';

const TableBody = styled.ul`
  position: relative;
  display: flex;
  flex-direction: column;
  padding-left: 24px;

  ${props =>
    props.isScroll
      ? `
    height: ${props.height}px;
    overflow: auto;
    box-shadow: inset 0 -10px 10px -10px ${props.theme.secondary};
  `
      : ''}
`;

const TableRow = styled.li`
  width: 100%;
`;

class TodoBody extends React.PureComponent {
  render() {
    const {
      todoList,
      handleRemoveTodo,
      handleEditTodo,
      todoItemRef,
      heightTableBody,
      isScroll,
    } = this.props;

    return (
      <TableBody
        data-testid="todo-list"
        data-scroll={isScroll}
        isScroll={isScroll}
        height={heightTableBody}
      >
        {todoList.map(todo => (
          <TableRow key={todo.id}>
            <TodoItem
              todoItemRef={todoItemRef}
              model={todo}
              onDelete={idTodo => handleRemoveTodo(idTodo)}
              onClickTitle={todo => handleEditTodo(todo)}
            />
          </TableRow>
        ))}
      </TableBody>
    );
  }
}

export default TodoBody;
