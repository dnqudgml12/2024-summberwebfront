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
} from "../../styles/Schedulestyled";
const AddModal = ({ onAdd, data, onCancel }) => {
  const [subject, setSubject] = useState("");
  const [professor, setProfessor] = useState("");
  const [day, setDay] = useState("Mon");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); //렌더링을 막음 -> 렌더링 시에 값이 없어지므로

    // 시간 중복 체크
    const isConflict = data.some((entry) => {
      return entry.day === day && entry.time === `${startTime} ~ ${endTime}`;
    });

    if (isConflict) {
      alert("이미 시간이 정해진 곳에 추가할 수 없습니다.");
      return;
    } else {
      const newEntry = {
        id: data.length + 1,
        subject,
        professor,
        day,
        time: `${startTime} ~ ${endTime}`,
        location,
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

  return (
    <ModalBackground>
      <ModalContent>
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

export default AddModal;
