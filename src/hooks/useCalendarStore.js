import { useDispatch, useSelector } from "react-redux";
import calendarApi from "../apis/calendarApi";
import { convertToDate } from "../helpers";
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store";

import Swal from 'sweetalert2';

export const useCalendarStore = () => {
  // Hooks
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Metodos

  // Dice que evento esta activo en el Modal
  const setCalendarActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  // Añade un Evento al Calendario
  // Simpre que dice start es async
  const startSavingEvent = async (calendarEvent) => {
    // TODO: parte del backend

    try {
      // Si sale todo bien
      // Si el calendarEvent tiene el _id estoy actualizando, sino estoy creando
      if (calendarEvent.id) {
        // Actualizar
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent); 
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      } else {
        //Crear
        const { data } = await calendarApi.post("/events", calendarEvent);
        dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
      }
      
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar evento", error.response.data?.msg, 'error');
    }

  };

  //Borrar Evento
  const startDeleteEvent = async() => {

    try {

      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());
      
    } catch (error) {
      console.log(error);
      Swal.fire("Error al borrar evento", error.response.data?.msg, 'error');
    }

  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");

      // Convierto las fechas de tipo String a tipo Date
      const events = convertToDate(data.event);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    // Propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    // Metodos
    setCalendarActiveEvent,
    startDeleteEvent,
    startLoadingEvents,
    startSavingEvent,
  };
};
