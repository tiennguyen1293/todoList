import styled from 'styled-components';

const ButtonComponent = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${props => props.padding || '4px 8px'};
  border-radius: 4px;
  font-size: ${props => props.fontSize || props.theme.fontSize};
  color: ${props => props.color || props.theme.black};
  background-color: ${props => props.backgroundColor};
  border: 1px solid ${props => props.borderColor || props.theme.secondary};
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.grey};
    border-color: ${props => props.theme.grey};
    color: ${props => props.theme.secondary};
  }

  &:disabled {
    opacity: 0.7;
    color: ${props => props.theme.primary};
    background-color: ${props => props.theme.grey};
    border-color: ${props => props.theme.grey};
    user-select: none;
    pointer-events: none;
  }
`;

export default ButtonComponent;
