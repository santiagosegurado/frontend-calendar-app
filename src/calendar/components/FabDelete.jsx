import React from "react"
import { useCalendarStore, useUiStore } from "../../hooks"

// Floating Action Buttom
export const FabDelete = () => {
  // Custom Hooks
  const { startDeleteEvent, hasEventSelected } = useCalendarStore()

  const handleDeleteEvent = () => {
    startDeleteEvent()
  };
  
  return (
    <button 
      className="btn btn-danger fab-danger" 
      onClick={handleDeleteEvent}
      style={{ display: hasEventSelected ? '' : 'none' }}
    >
      <i className="fas fa-trash-alt "> </i>
    </button>
  );
};
