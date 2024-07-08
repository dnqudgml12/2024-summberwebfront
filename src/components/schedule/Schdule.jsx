/*
1. 색깔도 객체에 넣어서 배경색으로 나타내게 하자 random값대신에
 */

import React, { useEffect, useRef, useState } from "react";
import { TimetableData as initialdata } from "../../data/schedule";
import AddModal from "./Scheduleadd";
import { Adddiv, HoverMenu } from "../../styles/Schedulestyled";
import EditModal from "./Schduleedit";
import styled from "styled-components";
import { TfiWrite } from "react-icons/tfi";
import { FaDeleteLeft } from "react-icons/fa6";
import "../../App.css";
const Schedule = () => {
  const headerCanvasRef = useRef(null); // header 캔버스에 대한 참조
  const bodyCanvasRef = useRef(null); // body 캔버스에 대한 참조
  const [data, setData] = useState(initialdata);
  // 지금은 db 연결 안되서 초기로 한번 로컬에서 불렀지만 나중에 연결 뒤에는 항상 state값 data가 업데이트 되면 db에서 다시 배열로 불러오는 과정을 넣어야 한다.
  const [hoveredEntry, setHoveredEntry] = useState(null);
  const [editingEntry, setEditingEntry] = useState(null);
  const [addEntry, setaddEntry] = useState(false);
  const [isAdddivHovered, setIsAdddivHovered] = useState(false);
  const [dimensions, setDimensions] = useState({ cellWidth: 0, cellHeight: 0 });
  // cellwidth를 useEffect안에서 지정하였으므로 dimension상태 안에 cell width를 저장
  

  // 랜덤 컬러 일으키는 함수

  const getRandomColor = () => {
    const base = 255;
    const mix = 200; // 이 값을 조정하여 색상의 밝기를 조정할 수 있습니다 (200 ~ 255)
    const getRandomValue = () => Math.floor(Math.random() * (base - mix) + mix);
    const r = getRandomValue();
    const g = getRandomValue();
    const b = getRandomValue();
    const color = `rgb(${r}, ${g}, ${b})`;
    return color;
  };

  useEffect(() => {
    const headerCanvas = headerCanvasRef.current;
    const bodyCanvas = bodyCanvasRef.current;
    const headerCtx = headerCanvas.getContext("2d");
    const bodyCtx = bodyCanvas.getContext("2d");

    // Set canvas dimensions (전체 캔버스 크기 설정)
    headerCanvas.width = 1300; // header 캔버스 너비 설정
    headerCanvas.height = 50; // header 캔버스 높이 설정
    bodyCanvas.width = 1300; // body 캔버스 너비 설정
    bodyCanvas.height = 1200; // body 캔버스 높이 설정

    // Define constants
    const hours = [
      "09:00 ~ 10:00",
      "10:00 ~ 11:00",
      "11:00 ~ 12:00",
      "12:00 ~ 13:00",
      "13:00 ~ 14:00",
      "14:00 ~ 15:00",
      "15:00 ~ 16:00",
      "16:00 ~ 17:00",
      "17:00 ~ 18:00",
      "18:00 ~ 19:00", 
      "19:00 ~ 20:00",
      "20:00 ~ 21:00",
      "21:00 ~ 22:00",
    ]; // 시간대를 나타내는 배열

    const hoursword = [
      "오전 9시",
      "오전 10시",
      "오전 11시",
      "오전 12시",
      "오후 1시",
      "오후 2시",
      "오후 3시",
      "오후 4시",
      "오후 5시",
      "오후 6시",
      "오후 7시",
      "오후 8시",
      "오후 9시",
      "오후 10시",
    ]; // 실제 표기 될 배열
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri"]; // 요일을 나타내는 배열
    const headerHeight = 50; // 헤더 셀의 높이
    const firstColumnWidth = 100; // 첫 번째 열의 너비
    const cellWidth = (headerCanvas.width - firstColumnWidth) / days.length; // 나머지 셀의 너비 계산
    const cellHeight = (bodyCanvas.height - headerHeight) / hours.length; // 셀의 높이 계산
    setDimensions({ cellWidth, cellHeight }); // 셀 크기를 상태로 설정

    // 바디 그리기
    bodyCtx.strokeStyle = "#ddd"; //바디 보더 색상
    for (let i = 0; i <= days.length; i++) {
      // 날짜별로 반복되며 선을 그리기 위한 것
      bodyCtx.moveTo(firstColumnWidth + i * cellWidth, 0);
      //그리기 커서를 매일 수직선의 시작점으로 이동, x 좌표는 첫 번째 열의 너비와 각 후속 열의 너비를 더해 계산됨

      bodyCtx.lineTo(firstColumnWidth + i * cellWidth, bodyCanvas.height);
      //본문 캔버스 하단까지 수직선 그림
    }
    for (let i = 0; i <= hours.length; i++) {
      //시간별로 마다 반복되며 선을 그리기 위해 한 번의 추가 반복이 추가 됨
      bodyCtx.moveTo(0, i * cellHeight + headerHeight);
      bodyCtx.lineTo(bodyCanvas.width, i * cellHeight + headerHeight);
    }
    bodyCtx.stroke(); // 실제로 캔버스에 모든 선 그림

    bodyCtx.fillStyle = "#666"; // 바디 텍스트 색상
    bodyCtx.font = "14px Apple SD Gothic Neo"; // 바디 텍스트 폰트와 크기
    for (let i = 0; i < hours.length; i++) {
      bodyCtx.fillText(hoursword[i], 70, i * cellHeight + headerHeight + 60); // 시간 텍스트 그리기
    }

    // Draw headers
    headerCtx.fillStyle = "#f8f8f8"; // 헤더 배경 색상
    headerCtx.fillRect(0, 0, headerCanvas.width, headerHeight); // 헤더 배경 그리기
    headerCtx.strokeStyle = "#ddd"; // 헤더 보더 색상
    headerCtx.strokeRect(0, 0, headerCanvas.width, headerHeight); // 첫번째 행 헤더 보더 그리기
    //ctx.fillRect(0, 0, cellWidth, canvas.height); // 첫번째 열 헤더 배경 그리기
    headerCtx.fillStyle = "#666"; // 헤더 텍스트 색상
    headerCtx.font = " 14px Apple SD Gothic Neo"; // 헤더 텍스트 폰트와 크기

    for (let i = 0; i < days.length; i++) {
      headerCtx.fillText(
        days[i],
        firstColumnWidth + i * cellWidth + cellWidth / 2 - 20,
        30
      );
      //header 부분에 날짜 이름을 그리는 것
      //x축의 firstColumnWidth + i * cellWidth + cellWidth / 2 - 20, y축의 30에 위치
      // 해당 열의 요일 이름을 중앙에 배치

      // header부분과 body부분이 같은 수직 경계선 가지도록 그려주는 것
      headerCtx.beginPath(); //그리기 위한 새경로 시작
      headerCtx.moveTo(firstColumnWidth + i * cellWidth, 0);
      // 그리기 커서를 수직선의 시작점으로 이동
      //x 좌표는 첫 번째 열의 너비와 각 후속 열의 너비를 더해 계산
      //y좌표는 헤더의 상단인 '0'
      headerCtx.lineTo(firstColumnWidth + i * cellWidth, headerHeight);
      //헤더 하단까지의 수직선
      headerCtx.stroke(); //실제로 캔버스에 선을 그림
    } // 헤더 텍스트 위치 조정
    // 요일 텍스트 그리기
    /*
    for (let i = 0; i < hours.length; i++) {
      ctx.fillText(hoursword[i], 70, i * cellHeight + headerHeight + 60);
    } // 헤더 텍스트 위치 조정
*/

    // Draw timetable data (시간표 데이터 그리기)
    data.forEach((entry) => {
      const dayIndex = days.indexOf(entry.day);
      const startTimeIndex = hours.findIndex(h => h.startsWith(entry.startTime));
      const endTimeIndex = hours.findIndex(h => h.endsWith(entry.endTime));
      if (dayIndex !== -1 && startTimeIndex !== -1 && endTimeIndex !== -1) {
        const x = firstColumnWidth + dayIndex * cellWidth;
        const y = startTimeIndex * cellHeight + headerHeight + 0.6;// 수정된 y 계산
        const entryHeight = (endTimeIndex - startTimeIndex + 1) * cellHeight; // +1을 추가하여 마지막 시간도 포함
        bodyCtx.fillStyle = getRandomColor(); // 셀 배경 색상 랜덤화
        bodyCtx.fillRect(x, y, cellWidth, entryHeight);
        bodyCtx.strokeStyle = "#ddd"; // 셀 보더 색상
        bodyCtx.strokeRect(x, y, cellWidth, entryHeight); // 셀 보더 그리기

        bodyCtx.fillStyle = "#000"; // 본문 텍스트 색상
        bodyCtx.font = "14px Arial"; // 본문 텍스트 폰트와 크기
        bodyCtx.fillText(entry.subject, x + 10, y + 20); // 본문 텍스트 위치 조정
        bodyCtx.fillText(entry.professor, x + 10, y + 40); // 본문 텍스트 위치 조정
        bodyCtx.fillText(entry.location, x + 10, y + 60); // 본문 텍스트 위치 조정
      }
    });

    const handleMouseMove = (e) => {
      // 시간표에 호버된 항목에 대한 값을 가지는 것
      // 이것 기반으로 edit
      if (addEntry && isAdddivHovered) {
        //새로 추가하기 하면 addEntry true, isAdddivHovered도 hover해서 위에 있으니까 true되서 hovered값 판별 못하여서 값이 있는 시간표를 호버해도 hoveredEntry가 안보인다.
        // 그런데 저장 버튼을 누르면 addEntry가 false가 되므로 여기 부분 false되서 다시 hovered값 판별하고 isAdddivHovered 도 false가 됨
        // 여기 부분 때문에 맨처음에 저장한 뒤에 hoveredEntry가 null이 되서 수정 삭제가 hover해도 안되었다.

        return;
        // AddModal이 열려있거나 Adddiv가 hover될 때는 아무 동작도 하지 않음
        // 새 수업 추가 부분과 시간표 부분이 겹쳐서 hover 되었을 시에
        // 수업 추가 Modal에 수정, 삭제가 동시에 나타나서 이를 해결하기 위해
      } else {
        const rect = bodyCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const hovered = data.find((entry) => {
          const dayIndex = days.indexOf(entry.day);
          const startTimeIndex = hours.findIndex(h => h.startsWith(entry.startTime));
          const endTimeIndex = hours.findIndex(h => h.endsWith(entry.endTime));
          /*
        days.indexOf(entry.day)와  const startTimeIndex = hours.findIndex(h => h.startsWith(entry.startTime));
          const endTimeIndex = hours.findIndex(h => h.endsWith(entry.endTime));)을 사용하여 
        항목의 요일과 시간을 기준으로 열과 행 인덱스를 찾기
    
         */
        if (dayIndex !== -1 && startTimeIndex !== -1 && endTimeIndex !== -1) {
            //항목의 요일과 시간이 유효하면 셀의 왼쪽 상단 위치 (cellX와 cellY)를 계산
            const cellX = firstColumnWidth + dayIndex * cellWidth;
            //첫번째 열의 위치+ 현재 요일에 해당하는 셀의 위치
            const cellY = headerHeight + startTimeIndex * cellHeight;
            //헤더 높이+ 현재 시간대에 해당하는 셀의 위치

            const entryHeight = (endTimeIndex - startTimeIndex +1) * cellHeight;
            return (
              x >= cellX &&
              x <= cellX + cellWidth &&
              y >= cellY &&
              y <= cellY + entryHeight
            );
          }
          return false;
        });

        if (hovered) {
          const dayIndex = days.indexOf(hovered.day);
          const startTimeIndex = hours.findIndex(h => h.startsWith(hovered.startTime));
          //호버된 항목이 있으면 셀의 hoverX와 hoverY 좌표를 다시 계산
          const hoverX = firstColumnWidth + dayIndex * cellWidth;
          //첫번째 열의 위치+ 현재 요일에 해당하는 셀의 위치
          const hoverY = headerHeight + startTimeIndex * cellHeight;
          //헤더 높이+ 현재 시간대에 해당하는 셀의 위치
          setHoveredEntry({ ...hovered, x: hoverX, y: hoverY });
        } else {
          setHoveredEntry(null);
        }
      }
    };

    bodyCanvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      bodyCanvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [data]);

  const handleAdd = (newEntry) => {
    setData([...data, newEntry]);
    setaddEntry(!addEntry);
  };

  const handleEdit = (id) => {
    const entry = data.find((entry) => entry.id === id);
    setEditingEntry(entry);
    //edit할때 edit할 부분을 찾아서 editingEntry에 넣음
  };

  const handleDelete = (id) => {
    setData(data.filter((entry) => entry.id !== id));
    setHoveredEntry(null);
  };

  const handleSave = (updatedEntry) => {
    //값 변하면 새롭게 업데이트
    setData(
      data.map((entry) => (entry.id === updatedEntry.id ? updatedEntry : entry))
    );
    setEditingEntry(null);
  };

  const handleCancel = () => {
    setEditingEntry(null);
  };

  const handleaddCancel = () => {
    setaddEntry(!addEntry);
  };

  console.log(addEntry);
  console.log(isAdddivHovered);

  return (
    <div>
      <div
        style={{
          paddingLeft: "100px",
          paddingTop: "90px",
          position: "sticky",
          top: "0",
          zIndex: "100",
        }}
      >
        <canvas ref={headerCanvasRef} />
      </div>
      <div style={{ height: "1000px" }}>
        <canvas
          ref={bodyCanvasRef}
          style={{
            marginTop: "-54.5px",
            marginLeft: "100px",
            border: "1px solid #ddd",
          }}
        />
      </div>
      {hoveredEntry &&
        !editingEntry &&
        !addEntry && ( // hover된 시간표의 부분이 값이 있는 부분이라면
          // editing 할때 edit된 부분이 아직 정해지지 않았으므로
          <HoverMenu
            style={{
              left: hoveredEntry.x+290,
              top: hoveredEntry.y,
            }}
          >
            <TfiWrite
              onClick={() => handleEdit(hoveredEntry.id)}
              //hover된 부분을 배열의 id로 찾아서 editEntry 값으로 지정한 뒤에
              // 이를 바탕으로 수정할 시간표를 지정
            >
              수정
            </TfiWrite>
            <FaDeleteLeft onClick={() => handleDelete(hoveredEntry.id)}>
              삭제
            </FaDeleteLeft>
          </HoverMenu>
        )}
      {editingEntry && (
        <EditModal
          entry={editingEntry}
          onSave={handleSave}
          onCancel={handleCancel}
          existingEntries={data}
        />
      )}

      {!addEntry ? (
        <Adddiv
          onClick={() => {
            setaddEntry(!addEntry);
          }}
          onMouseEnter={() => setIsAdddivHovered(true)}
          // Mouse가 위에 있을때 adddiv가 hover되었음을 나타냄
          onMouseLeave={() => setIsAdddivHovered(false)}
          // Mouse가 위에 없을 때 adddiv가 hover되지 않았음을 나타냄
        >
          + 새 수업 추가
        </Adddiv>
      ) : (
        <AddModal onAdd={handleAdd} data={data} onCancel={handleaddCancel} />
      )}
    </div>
  );
};

export default Schedule;
