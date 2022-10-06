import React, { useEffect, useMemo, useState } from "react"
import { addHours, differenceInSeconds } from 'date-fns'
import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import es from 'date-fns/locale/es'
import Swal from 'sweetalert2' 
import 'sweetalert2/dist/sweetalert2.min.css'

import Modal from "react-modal";
import "./CalendarModal.css";
import { useCalendarStore, useUiStore } from "../../hooks"


//Estilos Modal
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Poner Hora en español
registerLocale('es', es)

// Para que el Modal se ponga por arriba del root
Modal.setAppElement("#root");

export const CalendarModal = () => {

  // Custom Hooks
  const { isDateModalOpen, closeDateModal } = useUiStore()
  const { activeEvent, startSavingEvent } = useCalendarStore()


  //Hooks
  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2)
  })
  const { title, notes, start, end } = formValues
  
  const [startDate, setStartDate] = useState(new Date());
  const [submitStatus, setSubmitStatus] = useState(false)

  const titleClassInvalid = useMemo(() => {
    
    if (!submitStatus) return ''
    
    if (title.length > 0){
      return 'is-valid'
    }else{
      return 'is-invalid'
    } 
  }, [title, submitStatus])

  useEffect(() => {
    if (activeEvent) {
       setFormValues({...activeEvent})
    }

  }, [activeEvent])
  

  //Handlers
  const onCloseModal = () => {
    closeDateModal()
  };

  /* Handler de Inputs texto */
  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  /* 
    Handler de Inputs fechas 
    changing = si es start o end
  */
  const handleDateChange = (e, changing) => {
    setFormValues({
      ...formValues,
      [changing]: e
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    setSubmitStatus(true)

    //Validaciones 
    const diferrence = differenceInSeconds(end, start);

    if (isNaN(diferrence) || diferrence <= 0) {
      Swal.fire('Fechas Incorrectas', 'Revisar las fechas ingresadas', 'error' )
      return 
    }
    
    if (title.length <= 0) {
      return 
    }

    await startSavingEvent(formValues)
    closeDateModal()
    setSubmitStatus(false)
  }

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={2000}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={handleSubmit}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker 
            selected={start} 
            onChange={(e) => handleDateChange(e, 'start')}
            className='form-control'
            dateFormat="Pp"
            showTimeSelect
            locale='es'
            timeCaption="Hora"
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker 
            minDate={start}
            selected={end} 
            onChange={(e) => handleDateChange(e, 'end')}
            className='form-control'
            dateFormat="Pp"
            showTimeSelect
            locale='es'
            timeCaption="Hora"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClassInvalid}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={ title }
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={ notes }
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
