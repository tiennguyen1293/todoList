import React, { useState, useCallback, useEffect, useRef } from 'react';
import { defaultItem } from 'utils';
import { STATUS, MAX_ITEM } from 'contants';

function toggleStatus(todo) {
  return todo.status === STATUS.ACTIVE ? STATUS.DONE : STATUS.ACTIVE;
}

function useTodoList() {
  const [todoList, setAddTodo] = useState([]);
  const handleAddTodo = useCallback(
    nameTodo => {
      if (nameTodo) {
        const newTodo = defaultItem({
          title: nameTodo,
        });
        const todoUpdated = [...todoList, newTodo];

        setAddTodo(todoUpdated);
      }
    },
    [todoList],
  );

  const handleEditTodo = useCallback(
    newTodo => {
      const todoListUpdated = todoList.map(todo =>
        todo.id === newTodo.id
          ? {
              ...todo,
              status: toggleStatus(todo),
            }
          : todo,
      );

      setAddTodo(todoListUpdated);
    },
    [todoList],
  );

  const handleRemoveTodo = useCallback(
    id => {
      const todoListFiltered = todoList.filter(todo => todo.id !== id);
      setAddTodo(todoListFiltered);
    },
    [todoList],
  );

  return [
    todoList,
    handleAddTodo,
    handleEditTodo,
    handleRemoveTodo,
    setAddTodo,
  ];
}

function useFilterTodo([todoList, setAddTodo]) {
  const [statusCurrent, setFilterStatus] = useState('');
  const handleFilterTodo = useCallback(() => {
    return todoList.filter(todo =>
      statusCurrent ? todo.status === statusCurrent : todo,
    );
  }, [statusCurrent, todoList]);
  const todoListFiltered = handleFilterTodo();
  const toggleStatusAll = useCallback(() => {
    let todoListUpdated = [...todoListFiltered];

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
  }, [setAddTodo, statusCurrent, todoList, todoListFiltered]);

  return [todoListFiltered, setFilterStatus, toggleStatusAll, statusCurrent];
}

const withTodoListHOC = WrappedComponent => props => {
  const [
    todoList,
    handleAddTodo,
    handleEditTodo,
    handleRemoveTodo,
    setAddTodo,
  ] = useTodoList([]);
  const [
    todoListFiltered,
    setFilterStatus,
    toggleStatusAll,
    statusCurrent,
  ] = useFilterTodo([todoList, setAddTodo]);
  const todoItemRef = useRef(null);
  const [heightTableBody, setHeightScroll] = useState(0);
  useEffect(() => {
    if (todoItemRef && todoItemRef.current) {
      setHeightScroll(todoItemRef.current.clientHeight * (MAX_ITEM + 1));
    }
  }, [handleAddTodo]);

  return (
    <WrappedComponent
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
