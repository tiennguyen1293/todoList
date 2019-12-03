import React from 'react';
import styled from 'styled-components';

import Layout from 'layouts';
import InputBase from 'commons/Input/InputBase';

import TodoContainer from './TodoContainer';
import TodoBody from './components/TodoBody';
import ButtonGroup from './components/ButtonGroup';

const Header = styled.div`
  padding-bottom: 16px;
  border-bottom: 1px solid ${props => props.theme.secondary};
`;

const Table = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  border-bottom: 1px solid ${props => props.theme.secondary};
`;

const Paragraph = styled.p`
  padding: 16px;
`;

function TodoList({
  todoList,
  handleAddTodo,
  handleEditTodo,
  handleRemoveTodo,
  setFilterStatus,
  statusCurrent,
  toggleStatusAll,
  todoItemRef,
  heightTableBody,
}) {
  return (
    <Layout>
      <Header>
        <InputBase
          data-testid="input-add-todo"
          type="text"
          placeholder="Enter todo name here"
          onSubmit={nameTodo => handleAddTodo(nameTodo)}
        />
      </Header>

      <Table>
        {todoList.length > 0 ? (
          <TodoBody
            todoList={todoList}
            handleEditTodo={handleEditTodo}
            handleRemoveTodo={handleRemoveTodo}
            todoItemRef={todoItemRef}
            heightTableBody={heightTableBody}
          />
        ) : (
          <Paragraph data-testid="no-result">No Result</Paragraph>
        )}
      </Table>

      <ButtonGroup
        todoList={todoList}
        toggleStatusAll={toggleStatusAll}
        statusCurrent={statusCurrent}
        setFilterStatus={setFilterStatus}
      />
    </Layout>
  );
}

export default TodoContainer(TodoList);
