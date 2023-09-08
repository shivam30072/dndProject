import React from "react";
import Header from "./Header";
import { Droppable } from "react-beautiful-dnd";

const Hero = ({ id = "", children }) => {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          // id={`hero-${id}`}
          className="artboard sm:phone-1 bg-[#e5e6e6] rounded-lg px-3 pt-3 overflow-auto shadow-xl"
        >
          <Header text={id} />

          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Hero;
