import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const events = [
    {
        title: "Big Meeting",
        allDay: true,
        start: new Date(2024, 2, 27),
        end: new Date(2024, 2, 28),
    },
    {
        title: "Vacation",
        start: new Date(2021, 2, 28),
        end: new Date(2021, 2, 30),
    },
    {
        title: "Conference",
        start: new Date(2021, 2, 12),
        end: new Date(2021, 2, 23),
    },
];

function Cal1() {
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState(events);

    function handleAddEvent() {
        
        for (let i = 0; i <allEvents.length; i++)
        {
            const d1 = new Date (allEvents[i].start);
            const d2 = new Date(newEvent.start);
            const d3 = new Date(allEvents[i].end);
            const d4 = new Date(newEvent.end);
            if(
              ( (d1  <= d2) && (d2 <= d3) ) || ( (d1  <= d4) &&
                (d4 <= d3) )
            )
            {   
                alert("CLASH"); 
                break;
            }   
        }
        setAllEvents([...allEvents, newEvent]);
    }

    return (
        <div className="App">
            <div style={styles.container}>
                <input type="text" placeholder="Add Title" style={{ width: "20%", marginLeft: "10px", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                <DatePicker placeholderText="Start Date" style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                <span style={{ margin: "5px" }}></span> {/* Spacer */}
                <DatePicker placeholderText="End Date" style={{ marginRight: "10px" }} selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
                <button style={{ margin: "10px" }} onClick={handleAddEvent}> Add Event </button>
            </div>
            <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500 }} />
        </div>
    );
}

const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };
  

export default Cal1;