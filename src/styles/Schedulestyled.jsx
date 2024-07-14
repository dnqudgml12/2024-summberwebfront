import styled from "styled-components";

export const Adddiv = styled.div`
  margin: 0 1px;

  position: fixed;
  left: 50%;
  width: auto;
  bottom: 20px;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  background-color: #f91f15;

  padding: 0 20px 0 20px;
  border-radius: 20px;
  background-position: 25px center;
`;
export const HoverMenu = styled.div`
  width: 50px;
  //background-color: #F91F15;
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
  top: 31%;
  left: 10%;
  width: 100%;
  height: 100%;
  //background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 533px;
  height: 302px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const DaySelector = styled.div`
  padding-left: 5px;
  display: flex;
  //justify-content: space-between;
  margin: 10px 0;
`;
export const DayButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !["active"].includes(prop),
})`
  width: 25px;
  height: 25px;
  background: ${(props) => (props.active ? "#F91F15" : "#f2f2f2")};
  color: ${(props) => (props.active ? "#fff" : "#a6a6a6")};
  border: 1px solid #ddd;
  text-align: center;
 cursor:pointer;
  margin-right: 1px;

  /*
  &:hover {
    background: #007bff;
    color: white;
  }
    */
`;

export const TimeSelector = styled.div`
  padding-left: 5px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 5px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  //justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

export const Leftdiv = styled.div`
  //background-color: red;
  margin-top: 90px;
  max-width: 600px;
  width: 325px;
  display: flex;
  flex-direction: column;
  padding-left: 50px;
`;

export const Selecdiv = styled.div`
  width: auto;
  margin-bottom: 5px;
`;

export const Firstdiv = styled.div`
  width: auto;
  height: 155px;
  margin-bottom: 5px;
  padding: 25px;
  border: 1px solid #d6d6d6;
  background-color: #fff;
`;
export const Tablename = styled.div`
  color: #262626;
  font-size: 18px;
  font-weight: bold;
`;

export const Secondiv = styled.div`
  width: auto;
  height: 153px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const Selectsel = styled.select`
  width: 100%;
  height: 40px;
  line-height: 20px;
  padding: 10px;
  box-sizing: border-box;
  border: 2px solid #d6d6d6;
  color: #292929;
  font-size: 14px;
  background-color: transparent;
`;
export const Alldiv = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
`;

export const Changeword = styled.div`
  margin-top: 20px;
  color: #a6a6a6;
  font-size: 12px;
`;
export const Imagediv = styled.div`
  //padding-top: 20px;
  //padding-left: 40px;

  margin-top: 30px;
  width: 89px;
  height: 42px;
`;

export const Worddiv = styled.div`
  padding-left: 40px;
  border: 1px solid #e3e3e3;
  color: #737373;
  font-size: 15px;
  font-weight: bold;
  line-height: 3;
`;

export const Mediv = styled.div`
  margin-top: 30px;
  width: 89px;
  height: 100%;
`;

export const Thirddiv = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  height: auto;
  border: 1px solid #d6d6d6;
  background-color: #fff;
`;

export const Clickandmakediv = styled.div`
  width: auto;
  height: 51px;
  cursor: pointer;
`;

export const Maddiv = styled.div`
  width: auto;
  height: 51px;
`;

export const Madworddiv = styled.div`
  padding-left: 25px;
  color: #f91f15;
  background-repeat: no-repeat;
  background-position: 15px center;
  background-size: 15px 15px;
  line-height: 50px;
  border-top: ${(props) => props.bortop || "1px solid #e3e3e3"};
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: auto;
  height: auto;
`;
export const Title = styled.div`
  margin-bottom: 20px;
  color: #292929;
  font-size: 18px;
  font-weight: bold;
`;

export const Subjectdiv = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
  margin-bottom: 5px;
`;
export const Subjectname = styled.div`
  width: 80px;
  height: 30px;
  line-height: 30px;
  color: #a6a6a6;
  font-size: 12px;
  font-weight: bold;
`;

export const Subjectinput = styled.input`
  padding: 0 5px;
  width: 400px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #d6d6d6;
  color: #292929;
  font-size: 13px;
  background-color: #f2f2f2;
`;

export const Professordiv = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
  margin-bottom: 5px;
`;
export const Professorname = styled.div`
  width: 80px;
  height: 30px;
  line-height: 30px;
  color: #a6a6a6;
  font-size: 12px;
  font-weight: bold;
`;

export const Professorinput = styled.input`
  padding: 0 5px;
  width: 400px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #d6d6d6;
  color: #292929;
  font-size: 13px;
  background-color: #f2f2f2;
`;

export const Timeandplacediv = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
  margin-bottom: 5px;
`;
export const Timeandplacename = styled.div`
  width: 80px;
  height: 30px;
  line-height: 30px;
  color: #a6a6a6;
  font-size: 12px;
  font-weight: bold;
`;

export const TimeandplaceinputDiv = styled.div`
  display: flex;
  flex-direction: column;

  width: 412px;
  height: auto;

  border: 1px solid #d6d6d6;
`;
export const StarttimeSelect = styled.select`
  margin-right: 5px;
  height: 30px;
  border: 1px solid #d6d6d6;
  color: #292929;
  font-size: 13px;
`;

export const EndtimeSelect = styled.select`
  margin-right: 5px;
  height: 30px;
  border: 1px solid #d6d6d6;
  color: #292929;
  font-size: 13px;
`;
export const Canclebutton = styled.img`
  margin-top: 12px;
  width: 15px;
  height: 15px;
`;

export const Canclediv = styled.div`
cursor: pointer;
  text-align: center;
  background: #a6a6a6 no-repeat center center;
  z-index: 99;
  margin-left: 490px;

  margin-top: -40px;
  border-radius: 20px;
box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  width: 40px;
  height: 40px;

  &:hover {
    background-color: #f91f15;
  }
`;

export const Placeinput = styled.input`
  width: 72px;
  padding: 0 5px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #d6d6d6;
  color: #292929;
  font-size: 13px;
  background-color: #f2f2f2;
`;
export const Savebutton = styled.button`
  padding: 0 10px;
  margin-left: 480px;
 text-decoration: none;
  height: 30px;
  line-height: 30px;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  background-color: #f91f15;

`;
