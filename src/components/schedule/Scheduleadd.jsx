import React, { useState } from "react";
import styled from "styled-components";
import { TimetableData } from "../../data/schedule";
import {
  Adddiv,
  HoverMenu,
  ModalBackground,
  ModalContent,
  DaySelector,
  DayButton,
  TimeSelector,
  ButtonGroup,
  Form,
  Title,
  Subjectdiv,
  Subjectname,
  Subjectinput,
  Professordiv,
  Professorname,
  Professorinput,
  Timeandplacediv,
  Timeandplacename,
  TimeandplaceinputDiv,
  StarttimeSelect,
  EndtimeSelect,
  Placeinput,
  Canclebutton,
  Canclediv,
  Savebutton,
} from "../../styles/Schedulestyled";
import Cancle  from "../../assets/img/Cancle.png"
const AddModal = ({ onAdd, data, onCancel }) => {
  const [subject, setSubject] = useState("");
  const [professor, setProfessor] = useState("");
  const [day, setDay] = useState(" ");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const getRandomColor = () => {
    const base = 255;
    const mix = 200;
    const getRandomValue = () => Math.floor(Math.random() * (base - mix) + mix);
    const r = getRandomValue();
    const g = getRandomValue();
    const b = getRandomValue();
    const color = `rgb(${r}, ${g}, ${b})`;
    return color;
  };
  const handleSubmit = (e) => {
    e.preventDefault(); //렌더링을 막음 -> 렌더링 시에 값이 없어지므로

    // 시간 중복 체크
    const isConflict = data.some((entry) => {
      return (
        entry.day === day &&
        ((entry.startTime >= startTime && entry.startTime < endTime) ||
          (entry.endTime > startTime && entry.endTime <= endTime) ||
          (entry.startTime <= startTime && entry.endTime >= endTime))
      );
    });

    // 과목명, 교수명, 위치 중복 체크
    const isDuplicate = data.some((entry) => {
      return (
        entry.subject === subject ||
        entry.professor === professor ||
        entry.location === location
      );
    });

    if (isConflict) {
      alert("이미 시간이 정해진 곳에 추가할 수 없습니다.");
      return;
    } else if (isDuplicate) {
      alert("과목명, 교수명 또는 위치가 이미 존재합니다.");
      return;
    } else {
      const newEntry = {
        id: data.length + 1,
        subject,
        professor,
        day,
        startTime,
        endTime,
        location,
        color: getRandomColor(),
      };

      onAdd(newEntry);
      setSubject("");
      setProfessor("");
      setDay("Mon");
      setStartTime("09:00");
      setEndTime("10:00");
      setLocation("");
      setError("");
    }
  };
  const timeOptions = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];

  const filteredEndTimes = timeOptions.filter((time) => time > startTime);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const displayDays = ["월", "화", "수", "목", "금"];
  return (
   
    <ModalBackground>
      
      <ModalContent>
      <Canclediv onClick={onCancel} >
          <Canclebutton src={Cancle} />
        </Canclediv>
        <Form onSubmit={handleSubmit}>
   
        
 
          <Title>새 수업 추가</Title>
          <Subjectdiv>
            <Subjectname>과목명 (필수)</Subjectname>
            <Subjectinput
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="예) 경제학입문"
              required
            />
          </Subjectdiv>
          <Professordiv>
            <Professorname>교수명 (필수)</Professorname>
            <Professorinput
              type="text"
              value={professor}
              onChange={(e) => setProfessor(e.target.value)}
              placeholder="예) 홍길동"
              required
            />
          </Professordiv>

          <Timeandplacediv>
            <Timeandplacename>시간/장소</Timeandplacename>
            <TimeandplaceinputDiv>
              <DaySelector>
                {days.map((d, index) => (
                  <DayButton
                    key={d}
                    active={day === d}
                    onClick={(e) => {
                      e.preventDefault();
                      setDay(d);
                    }}
                  >
                    {displayDays[index]}
                  </DayButton>
                ))}
              </DaySelector>

              <TimeSelector>
                <StarttimeSelect
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                >
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </StarttimeSelect>
                ~
                <EndtimeSelect
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                >
                  {filteredEndTimes.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </EndtimeSelect>
                <Placeinput
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="예)종303"
                />
              </TimeSelector>
            </TimeandplaceinputDiv>
          </Timeandplacediv>

          <ButtonGroup>
            
            <Savebutton type="submit">저장</Savebutton>
     
          </ButtonGroup>
        </Form>
      </ModalContent>
    </ModalBackground>
  );
};

export default AddModal;
