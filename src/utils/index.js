import uuid from 'uuid';
import { STATUS } from './contants';

export const defaultItem = props => {
  let todo = {};
  todo.id = (props && props.id) || uuid.v4();
  todo.title = (props && props.title) || 'new todo';
  todo.status = (props && props.status) || STATUS.ACTIVE;

  return todo;
};
