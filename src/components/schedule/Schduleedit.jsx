import React, { useState } from "react";
import styled from "styled-components";
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
import Cancle from "../../assets/img/Cancle.png";
const EditModal = ({ entry, onSave, onCancel, existingEntries }) => {
  const [subject, setSubject] = useState(entry.subject); //과목 부분
  const [professor, setProfessor] = useState(entry.professor); // 교수님 정보
  const [day, setDay] = useState(entry.day); // 요일 정보
  const [startTime, setStartTime] = useState(entry.startTime); // 시작 시간 정보
  const [endTime, setEndTime] = useState(entry.endTime); // 마치는 시간 정보
  /*
    const [startTime, setStartTime] = useState(entry.time.split(" ~ ")[0]); // 시작 시간 정보
  const [endTime, setEndTime] = useState(entry.time.split(" ~ ")[1]); // 마치는 시간 정보 */
  const [location, setLocation] = useState(entry.location); // 장소 정보

  const handleSubmit = (e) => {
    e.preventDefault();

    const overlappingEntry = existingEntries.find((existingEntry) => {
      // 이미 존재하는 시간표에 있는 과목에는 접근 못하도록 하기 위해
      return (
        existingEntry.id !== entry.id &&
        existingEntry.day === day &&
        ((existingEntry.startTime >= startTime &&
          existingEntry.startTime < endTime) ||
          (existingEntry.endTime > startTime &&
            existingEntry.endTime <= endTime) ||
          (existingEntry.startTime <= startTime &&
            existingEntry.endTime >= endTime))
      );
    });

    // 과목명, 교수명, 위치 중복 체크
    /*
    const isDuplicate = existingEntries.some((entry) => {
      return (
        entry.subject === subject ||
        entry.professor === professor ||
        entry.location === location
      );
    });
    else if (isDuplicate) {
        alert("과목명, 교수명 또는 위치가 이미 존재합니다.");
        return;
      } 
        // 할 필요 없다
*/
    if (overlappingEntry) {
      alert("이미 같은 시간에 수업이 있습니다.");
      return;
    } else {
      // 새롭게 저장될 부분
      onSave({
        ...entry, // 기존에 정보에 더해지는 형태
        subject,
        professor,
        day,
        startTime,
        endTime,
        //time: `${startTime} ~ ${endTime}`, // 이전에 시간 형태가 09:00~10:00 이였음
        location,
      });
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
          <Title>수업 정보 변경</Title>
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

export default EditModal;
