import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

const SingleTask = ({
  title,
  desc,
  id = "",
  setTaskId,
  setTaskTitle,
  setTaskDesc,
  index,
  task = "",
  setOpen,
  setOpend,
}) => {
  function callEditTask() {
    setOpen(true);
    setTaskId(id);
    setTaskTitle(title);
    setTaskDesc(desc);
  }

  function callDeleteTask() {
    setOpend(true);
    setTaskId(id);
  }
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <Card
          sx={{
            borderRadius: 4,
            marginBottom: 2,
            bgColor: snapshot.isDragging ? "#60a5fa" : "",
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {desc}
            </Typography>
          </CardContent>
          {task && (
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                cursor: "pointer",
              }}
            >
              <img
                style={{
                  transition: "ease-in-out",
                  transitionDelay: 0.3,
                  transform: "scale(0.5)",
                }}
                src="/pencil.png"
                alt="edit"
                height={30}
                width={30}
                onClick={callEditTask}
              />
              <img
                style={{
                  transition: "ease-in-out",
                  transitionDelay: 0.3,
                  transform: "scale(0.5)",
                }}
                src="/trash.png"
                alt="edit"
                height={30}
                width={30}
                onClick={callDeleteTask}
              />
            </CardActions>
          )}
        </Card>
      )}
    </Draggable>
  );
};

export default SingleTask;

{
  /* <div
  className={`card w-76 bg-base-100 shadow-xl mb-3 ${
    snapshot.isDragging ? "#60a5fa" : ""
  }`}
  {...provided.draggableProps}
  {...provided.dragHandleProps}
  ref={provided.innerRef}
>
  <div className="card-body">
    <h2 className="card-title">{title}</h2>
    <p>{desc}</p>

    {task && (
      <div className="card-actions justify-end cursor-pointer">
        <img
          className="hover:scale-125 transition ease-in-out delay-150"
          src="/pencil.png"
          alt="edit"
          height={20}
          width={20}
          onClick={callEditTask}
        />
        <img
          className="hover:scale-125 transition ease-in-out delay-150"
          src="/trash.png"
          alt="edit"
          height={20}
          width={20}
          onClick={callDeleteTask}
        />
      </div>
    )}
  </div>
</div> */
}
