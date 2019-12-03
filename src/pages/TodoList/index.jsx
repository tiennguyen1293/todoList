import React from 'react';
import styled from 'styled-components';

import Layout from 'layouts';
import { MAX_ITEM } from 'utils/contants';
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

class TodoList extends React.PureComponent {
  render() {
    const {
      todoList,
      handleAddTodo,
      handleEditTodo,
      handleRemoveTodo,
      setCurrentStatus,
      statusCurrent,
      toggleStatusAll,
      todoItemRef,
      heightTableBody,
    } = this.props;

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
              isScroll={todoList.length >= MAX_ITEM}
            />
          ) : (
            <Paragraph data-testid="no-result">No Result</Paragraph>
          )}
        </Table>

        <ButtonGroup
          todoList={todoList}
          toggleStatusAll={toggleStatusAll}
          statusCurrent={statusCurrent}
          setCurrentStatus={setCurrentStatus}
        />
      </Layout>
    );
  }
}

export default TodoContainer(TodoList);
