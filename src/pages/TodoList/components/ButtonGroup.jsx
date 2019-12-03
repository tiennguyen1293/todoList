import React from 'react';
import styled from 'styled-components';

import { STATUS } from 'contants';
import Button from 'commons/Button/Button';

const ButtonToggle = styled(Button)`
  margin-bottom: 8px;
`;

const Groups = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonStatus = styled(Button)`
  margin-right: 8px;

  background-color: ${props => (props.isActive ? props.theme.secondary : '')};
  color: ${props => (props.isActive ? props.theme.primary : '')};
`;

const ButtonGroup = ({
  todoList,
  toggleStatusAll,
  statusCurrent,
  setFilterStatus,
}) => {
  return (
    <>
      <ButtonToggle disabled={todoList.length === 0} onClick={toggleStatusAll}>
        Toggle All
      </ButtonToggle>
      <Groups>
        <ButtonStatus
          isActive={!statusCurrent}
          disabled={!statusCurrent}
          onClick={() => setFilterStatus('')}
        >
          All
        </ButtonStatus>
        <ButtonStatus
          isActive={statusCurrent === STATUS.ACTIVE}
          disabled={statusCurrent === STATUS.ACTIVE}
          onClick={() => setFilterStatus(STATUS.ACTIVE)}
        >
          Active
        </ButtonStatus>
        <ButtonStatus
          isActive={statusCurrent === STATUS.DONE}
          disabled={statusCurrent === STATUS.DONE}
          onClick={() => setFilterStatus(STATUS.DONE)}
        >
          Done
        </ButtonStatus>
      </Groups>
    </>
  );
};

export default ButtonGroup;
