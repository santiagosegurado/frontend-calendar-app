import { addHours } from "date-fns";
import React from "react";
import { useCalendarStore, useUiStore } from "../../hooks";

// Floating Action Buttom
export const FabAddNew = () => {
  // Custom Hooks
  const { opeDateModal } = useUiStore();
  const { setCalendarActiveEvent } = useCalendarStore();

  const handleModalOpen = () => {
    setCalendarActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: " #fafafa ",
      user: {
        _id: "123",
        name: "Santiago",
      },
    }); 
    opeDateModal();
  };

  return (
    <button className="btn btn-primary fab" onClick={handleModalOpen}>
      <i className="fas fa-plus "> </i>
    </button>
  );
};
