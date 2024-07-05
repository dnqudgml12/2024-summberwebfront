import React, { useEffect, useRef } from 'react';
import { TimetableData } from '../../data/schedule';

const Schedule = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Set canvas dimensions
        canvas.width = 1300;
        canvas.height = 1200;

        // Define constants
        const hours = [
            '09:00 ~ 10:00', '10:00 ~ 11:00', '11:00 ~ 12:00',
            '12:00 ~ 13:00', '13:00 ~ 14:00', '14:00 ~ 15:00',
            '15:00 ~ 16:00', '16:00 ~ 17:00', '17:00 ~ 18:00',
        ];
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
        const cellWidth = canvas.width / (days.length + 1);
        const cellHeight = canvas.height / (hours.length + 1);

        // Draw table
        ctx.strokeStyle = '#ddd';
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
        ctx.fillStyle = '#000';
        ctx.font = '16px Arial';
        for (let i = 0; i < days.length; i++) {
            ctx.fillText(days[i], (i + 1) * cellWidth + 90, 60);
        }
        for (let i = 0; i < hours.length; i++) {
            ctx.fillText(hours[i], 50, (i + 1) * cellHeight + 50);
        }

        // Draw timetable data
        TimetableData.forEach((entry) => {
            const dayIndex = days.indexOf(entry.day);
            const timeIndex = hours.indexOf(entry.time);
            if (dayIndex !== -1 && timeIndex !== -1) {
                const x = (dayIndex + 1) * cellWidth;
                const y = (timeIndex + 1) * cellHeight;
                ctx.fillStyle = '#f9f9f9';
                ctx.fillRect(x, y, cellWidth, cellHeight);

                ctx.fillStyle = '#000';
                ctx.fillText(entry.subject, x + 50, y + 30);
                ctx.fillText(entry.professor, x + 50, y + 60);
                ctx.fillText(entry.location, x + 50, y + 90);
            }
        });
    }, []);

    return <canvas ref={canvasRef} style={{ border: '1px solid #ddd',marginTop:"80px" }} />;
};

export default Schedule;