import React, { useState, useCallback, useEffect, useRef } from 'react';
import { defaultItem } from 'utils';
import { STATUS, MAX_ITEM } from 'utils/contants';

function toggleStatus(todo) {
  return todo.status === STATUS.ACTIVE ? STATUS.DONE : STATUS.ACTIVE;
}

function updateTodoList([todoList, todoListFiltered, statusCurrent]) {
  const todoListLeft = todoList.filter(todo => todo.status !== statusCurrent);
  const todoListStatusDifference = todoListFiltered.map(todo => ({
    ...todo,
    status: toggleStatus(todo),
  }));
  return [...todoListLeft, ...todoListStatusDifference];
}

function useTodoList(initialData) {
  const [todoList, setAddTodo] = useState(initialData);
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
  const [statusCurrent, setCurrentStatus] = useState('');
  const handleFilterTodo = useCallback(
    () =>
      todoList.filter(todo =>
        statusCurrent ? todo.status === statusCurrent : todo,
      ),
    [statusCurrent, todoList],
  );
  const todoListFiltered = handleFilterTodo();
  const toggleStatusAll = useCallback(() => {
    let todoListUpdated = [...todoListFiltered];

    if (statusCurrent) {
      todoListUpdated = updateTodoList([
        todoList,
        todoListFiltered,
        statusCurrent,
      ]);
    } else {
      todoListUpdated = todoListFiltered.map(todo => ({
        ...todo,
        status: toggleStatus(todo),
      }));
    }

    setAddTodo(todoListUpdated);
  }, [setAddTodo, statusCurrent, todoList, todoListFiltered]);

  return [todoListFiltered, setCurrentStatus, toggleStatusAll, statusCurrent];
}

function withTodoListHOC(Component) {
  function WrappedComponent(props) {
    const [
      todoList,
      handleAddTodo,
      handleEditTodo,
      handleRemoveTodo,
      setAddTodo,
    ] = useTodoList(props.data || []);
    const [
      todoListFiltered,
      setCurrentStatus,
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
      <Component
        todoList={todoListFiltered}
        handleAddTodo={handleAddTodo}
        handleEditTodo={handleEditTodo}
        handleRemoveTodo={handleRemoveTodo}
        setAddTodo={setAddTodo}
        setCurrentStatus={setCurrentStatus}
        toggleStatusAll={toggleStatusAll}
        todoItemRef={todoItemRef}
        heightTableBody={heightTableBody}
        statusCurrent={statusCurrent}
      />
    );
  }

  return WrappedComponent;
}

export default withTodoListHOC;
