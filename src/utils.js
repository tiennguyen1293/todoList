import uuid from 'uuid';
import { STATUS } from 'contants';

export const defaultItem = props => {
  let todo = {};
  todo.id = uuid.v4();
  todo.title = props && props.title;
  todo.status = (props && props.status) || STATUS.ACTIVE;

  return todo;
};
