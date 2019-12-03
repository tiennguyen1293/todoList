import React from 'react';
import styled from 'styled-components';

import { STATUS } from 'utils/contants';
import Button from 'commons/Button/Button';

const ButtonToggle = styled(Button)`
  margin-bottom: 8px;
`;

const Groups = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonStatus = styled(Button)`
  margin-right: 8px;

  background-color: ${props => (props.isActive ? props.theme.secondary : '')};
  color: ${props => (props.isActive ? props.theme.primary : '')};
`;

class ButtonGroup extends React.PureComponent {
  render() {
    const {
      todoList,
      toggleStatusAll,
      statusCurrent,
      setCurrentStatus,
    } = this.props;

    return (
      <>
        <ButtonToggle
          data-testid="toggle-all"
          disabled={todoList.length === 0}
          onClick={toggleStatusAll}
        >
          Toggle All
        </ButtonToggle>
        <Groups>
          <ButtonStatus
            data-testid="all-button"
            isActive={!statusCurrent}
            disabled={!statusCurrent}
            onClick={() => setCurrentStatus('')}
          >
            All
          </ButtonStatus>
          <ButtonStatus
            data-testid="active-button"
            isActive={statusCurrent === STATUS.ACTIVE}
            disabled={statusCurrent === STATUS.ACTIVE}
            onClick={() => setCurrentStatus(STATUS.ACTIVE)}
          >
            Active
          </ButtonStatus>
          <ButtonStatus
            data-testid="done-button"
            isActive={statusCurrent === STATUS.DONE}
            disabled={statusCurrent === STATUS.DONE}
            onClick={() => setCurrentStatus(STATUS.DONE)}
          >
            Done
          </ButtonStatus>
        </Groups>
      </>
    );
  }
}

export default ButtonGroup;
