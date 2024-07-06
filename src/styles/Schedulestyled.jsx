import styled from "styled-components";

export const Adddiv=styled.div`
margin: 0 1px;

position: fixed;
    left: 526px;
    width: auto;
   bottom: 20px;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    background-color: #F91F15;
  
    padding: 0 20px 0 20px;
    border-radius: 20px;
    background-position: 25px center;

`
export const HoverMenu = styled.div`
width: 50px;
background-color: #F91F15;
margin-top: 100px;
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 10px;
  z-index: 10;
`;

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const DaySelector = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;

export const DayButton = styled.button.attrs(props => ({
    active: props.active ? 'true' : undefined
  }))`
  background: ${(props) => (props.active ? "#007bff" : "#f8f9fa")};
  color: ${(props) => (props.active ? "white" : "black")};
  border: 1px solid #ddd;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background: #007bff;
    color: white;
  }
`;

export const TimeSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;
