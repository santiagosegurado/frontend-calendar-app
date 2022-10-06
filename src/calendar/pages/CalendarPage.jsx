import React, { useEffect, useState } from "react";
import { Calendar } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useSelector } from "react-redux";

import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from "../"
import { localizer, getMessageES } from "../../helpers" 
import { useUiStore, useCalendarStore, useAuthStore } from "../../hooks"





export const CalendarPage = () => {

  //Hooks
  const { user } = useAuthStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

  // Custom Hooks
  const { opeDateModal, closeDateModal  } = useUiStore();
  const {events, setCalendarActiveEvent, startLoadingEvents} = useCalendarStore();

  //Handlers
  const onDoubleClick = (e) => {
    opeDateModal()
  }

  const onSelect = (e) => {
    setCalendarActiveEvent(e)
  }

  const onViewChange = (e) => {
    // Cuando la vista del evento cambie lanzo un setState para guardarlo
    localStorage.setItem('lastView', e)
    setLastView(e)
  }

  
  // Estilos para cada evento 
  // Espera que le duevuelva un objetos de estilos
  const eventStyleGetter = (event, start, end, isSelected) => {
    // Para saber un evento es mio
    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);
    
    const styles = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    }
     
    return {
      styles
    }
  }


  useEffect(() => {
    startLoadingEvents();
  }, [])
  

  return (
    <>
    
      <Navbar />
      <Calendar
        culture="es"
        localizer={localizer}
        defaultView={lastView}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px)' }}
        messages={ getMessageES() }
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}        
      />

      <CalendarModal/>
      <FabAddNew/>
      <FabDelete/>

    </>
  );
};
