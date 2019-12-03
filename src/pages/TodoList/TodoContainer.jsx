import React, { useState, useRef } from 'react';
import { defaultItem } from 'utils';
import { STATUS, MAX_ITEM } from 'contants';

function toggleStatus(todo) {
  return todo.status === STATUS.ACTIVE ? STATUS.DONE : STATUS.ACTIVE;
}

function useTodoList() {
  const [todoList, setAddTodo] = useState([]);

  const handleAddTodo = nameTodo => {
    const newTodo = defaultItem({
      title: nameTodo,
    });
    const todoUpdated = [...todoList, newTodo];

    setAddTodo(todoUpdated);
  };

  const handleEditTodo = newTodo => {
    const todoListUpdated = todoList.map(todo =>
      todo.id === newTodo.id
        ? {
            ...todo,
            status: toggleStatus(todo),
          }
        : todo,
    );

    setAddTodo(todoListUpdated);
  };

  const handleRemoveTodo = id => {
    const todoListFiltered = todoList.filter(todo => todo.id !== id);
    setAddTodo(todoListFiltered);
  };

  return [
    todoList,
    handleAddTodo,
    handleEditTodo,
    handleRemoveTodo,
    setAddTodo,
  ];
}

const withTodoListHOC = WrappedComponent => props => {
  const todoItemRef = useRef(null);
  const [heightTableBody, setHeightScroll] = useState(0);
  if (todoItemRef && todoItemRef.current && !heightTableBody) {
    setHeightScroll(todoItemRef.current.clientHeight * (MAX_ITEM + 1));
  }
  const [
    todoList,
    handleAddTodo,
    handleEditTodo,
    handleRemoveTodo,
    setAddTodo,
  ] = useTodoList([]);
  const [statusCurrent, setFilterStatus] = useState('');

  const handleFilterTodo = () => {
    return todoList.filter(todo =>
      statusCurrent ? todo.status === statusCurrent : todo,
    );
  };
  const todoListFiltered = handleFilterTodo();
  const toggleStatusAll = () => {
    let todoListUpdated = todoListFiltered;

    if (!statusCurrent) {
      todoListUpdated = todoListFiltered.map(todo => ({
        ...todo,
        status: toggleStatus(todo),
      }));
    } else {
      const todoListLeft = todoList.filter(
        todo => todo.status !== statusCurrent,
      );
      const test = todoListFiltered.map(todo => ({
        ...todo,
        status: toggleStatus(todo),
      }));

      todoListUpdated = [...todoListLeft, ...test];
    }

    setAddTodo(todoListUpdated);
  };

  return (
    <WrappedComponent
      {...props}
      todoList={todoListFiltered}
      handleAddTodo={handleAddTodo}
      handleEditTodo={handleEditTodo}
      handleRemoveTodo={handleRemoveTodo}
      setAddTodo={setAddTodo}
      setFilterStatus={setFilterStatus}
      toggleStatusAll={toggleStatusAll}
      todoItemRef={todoItemRef}
      heightTableBody={heightTableBody}
      statusCurrent={statusCurrent}
    />
  );
};

export default withTodoListHOC;
