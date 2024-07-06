import React, { useEffect, useRef, useState } from "react";
import { TimetableData as initialdata } from "../../data/schedule";
import ScheduleAddForm from "./Scheduleadd";
import styled from "styled-components";
import EditModal from "./Schduleedit";
const Schedule = () => {
  const canvasRef = useRef(null);
  const [data, setData] = useState(initialdata);
  const [hoveredEntry, setHoveredEntry] = useState(null);
  const [editingEntry, setEditingEntry] = useState(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions
    canvas.width = 1300;
    canvas.height = 1200;

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
    ];
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    const cellWidth = canvas.width / (days.length + 1);
    const cellHeight = canvas.height / (hours.length + 1);

    // Draw table
    ctx.strokeStyle = "#ddd";
    for (let i = 0; i <= days.length; i++) {
      ctx.moveTo(i * cellWidth, 0);
      ctx.lineTo(i * cellWidth, canvas.height);
    }
    for (let i = 0; i <= hours.length; i++) {
      ctx.moveTo(0, i * cellHeight);
      ctx.lineTo(canvas.width, i * cellHeight);
    }
    ctx.stroke();

    // Draw headers
    ctx.fillStyle = "#000";
    ctx.font = "16px Arial";
    for (let i = 0; i < days.length; i++) {
      ctx.fillText(days[i], (i + 1) * cellWidth + 90, 60);
    }
    for (let i = 0; i < hours.length; i++) {
      ctx.fillText(hours[i], 50, (i + 1) * cellHeight + 50);
    }

    // Draw timetable data
    data.forEach((entry) => {
      const dayIndex = days.indexOf(entry.day);
      const timeIndex = hours.indexOf(entry.time);
      if (dayIndex !== -1 && timeIndex !== -1) {
        const x = (dayIndex + 1) * cellWidth;
        const y = (timeIndex + 1) * cellHeight;
        ctx.fillStyle = "#f9f9f9";
        ctx.fillRect(x, y, cellWidth, cellHeight);

        ctx.fillStyle = "#000";
        ctx.fillText(entry.subject, x + 50, y + 30);
        ctx.fillText(entry.professor, x + 50, y + 60);
        ctx.fillText(entry.location, x + 50, y + 90);
      }
    });

    const handleMouseMove = (e) => {
        //호버된 항목에 대한 값을 가지는 것
        // 이것 기반으로 edit
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const hovered = data.find((entry) => {
        const dayIndex = days.indexOf(entry.day);
        const timeIndex = hours.indexOf(entry.time);
        /*
        days.indexOf(entry.day)와 hours.indexOf(entry.time)을 사용하여 
        항목의 요일과 시간을 기준으로 열과 행 인덱스를 찾기
    
         */
        if (dayIndex !== -1 && timeIndex !== -1) {
            //항목의 요일과 시간이 유효하면 셀의 왼쪽 상단 위치 (cellX와 cellY)를 계산
          const cellX = (dayIndex + 1) * cellWidth;
          const cellY = (timeIndex + 1) * cellHeight;
          return (
            x >= cellX &&
            x <= cellX + cellWidth &&
            y >= cellY &&
            y <= cellY + cellHeight
          );
        }
        return false;
      });

      if (hovered) {
        const dayIndex = days.indexOf(hovered.day);
        const timeIndex = hours.indexOf(hovered.time);
        //호버된 항목이 있으면 셀의 hoverX와 hoverY 좌표를 다시 계산
        const hoverX = (dayIndex + 1) * cellWidth;
        const hoverY = (timeIndex + 1) * cellHeight;
        setHoveredEntry({ ...hovered, x: hoverX, y: hoverY });
      } else {
        setHoveredEntry(null);
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [data]);

  const handleAdd = (newEntry) => {
    setData([...data, newEntry]);
  };

  const handleEdit = (id) => {
    const entry = data.find(entry => entry.id === id);
    setEditingEntry(entry);
    //edit할때 edit할 부분을 찾아서 editingEntry에 넣음
};

const handleDelete = (id) => {
    setData(data.filter(entry => entry.id !== id));
};


const handleSave = (updatedEntry) => {
    //값 변하면 새롭게 업데이트
    setData(data.map(entry => entry.id === updatedEntry.id ? updatedEntry : entry));
    setEditingEntry(null);
};

const handleCancel = () => {
    setEditingEntry(null);
};



  return (
    <div>
    <canvas ref={canvasRef} style={{ border: '1px solid #ddd' }} />
    {hoveredEntry && !editingEntry && (
        <HoverMenu style={{ left: hoveredEntry.x, top: hoveredEntry.y }}>
            <button onClick={() => handleEdit(hoveredEntry.id)}>수정</button>
            <button onClick={() => handleDelete(hoveredEntry.id)}>삭제</button>
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
    <ScheduleAddForm onAdd={handleAdd} data={data} />
</div>
  );
};

const HoverMenu = styled.div`
  position: absolute;
  background: white;
  border: 1px solid #ddd;
  padding: 10px;
  z-index: 10;
`;
export default Schedule;
