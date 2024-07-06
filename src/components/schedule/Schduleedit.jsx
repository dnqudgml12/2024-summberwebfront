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
} from "../../styles/Schedulestyled";
const EditModal = ({ entry, onSave, onCancel, existingEntries }) => {
  const [subject, setSubject] = useState(entry.subject); //과목 부분
  const [professor, setProfessor] = useState(entry.professor); // 교수님 정보
  const [day, setDay] = useState(entry.day); // 요일 정보
  const [startTime, setStartTime] = useState(entry.startTime)// 시작 시간 정보
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
        ((existingEntry.startTime >= startTime && existingEntry.startTime < endTime) ||
          (existingEntry.endTime > startTime && existingEntry.endTime <= endTime) ||
          (existingEntry.startTime <= startTime && existingEntry.endTime >= endTime))
      );
    });

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

  return (
    <ModalBackground>
      <ModalContent>
        <h2>수업 정보 변경</h2>
        <form onSubmit={handleSubmit}>
          <label>
            과목명 (필수):
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </label>
          <label>
            교수명:
            <input
              type="text"
              value={professor}
              onChange={(e) => setProfessor(e.target.value)}
            />
          </label>
          <label>
            요일:
            <DaySelector>
              {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d) => (
                <DayButton
                  key={d}
                  active={day === d}
                  onClick={(e) => {
                    e.preventDefault();
                    setDay(d);
                  }}
                >
                  {d}
                </DayButton>
              ))}
            </DaySelector>
          </label>
          <label>
            시간:
            <TimeSelector>
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              >
                <option value="09:00">오전 9시</option>
                <option value="10:00">오전 10시</option>
                <option value="11:00">오전 11시</option>
                <option value="12:00">오전 12시</option>
                <option value="13:00">오후 1시</option>
                <option value="14:00">오후 2시</option>
                <option value="15:00">오후 3시</option>
                <option value="16:00">오후 4시</option>
                <option value="17:00">오후 5시</option>
              </select>
              ~
              <select
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              >
                <option value="10:00">오전 10시</option>
                <option value="11:00">오전 11시</option>
                <option value="12:00">오전 12시</option>
                <option value="13:00">오후 1시</option>
                <option value="14:00">오후 2시</option>
                <option value="15:00">오후 3시</option>
                <option value="16:00">오후 4시</option>
                <option value="17:00">오후 5시</option>
                <option value="18:00">오후 6시</option>
              </select>
            </TimeSelector>
          </label>
          <label>
            장소:
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </label>
          <ButtonGroup>
            <button type="submit">저장</button>
            <button type="button" onClick={onCancel}>
              취소
            </button>
          </ButtonGroup>
        </form>
      </ModalContent>
    </ModalBackground>
  );
};

export default EditModal;
