import axios from "axios";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Navbar from "../components/Navbar";
import SingleTask from "../components/SingleTask";
import Header from "../components/Header";
import { Box } from "@mui/material";
import { TaskState } from "../context/AuthProvider";

const Container = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [taskId, setTaskId] = useState();
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [inProgressTask, setInProgressTask] = useState([]);
  const [doneTask, setDoneTask] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [opend, setOpend] = useState(false);

  const { token } = TaskState();
  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return;

    let add,
      active = allTasks,
      progress = inProgressTask,
      done = doneTask;
    if (source.droppableId === "to-do") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else if (source.droppableId === "in-progress") {
      add = progress[source.index];
      progress.splice(source.index, 1);
    } else {
      add = done[source.index];
      done.splice(source.index, 1);
    }

    if (destination.droppableId === "to-do") {
      active.splice(destination.index, 0, add);
    } else if (destination.droppableId === "in-progress") {
      progress.splice(destination.index, 0, add);
    } else {
      done.splice(destination.index, 0, add);
    }

    setInProgressTask(progress);
    setAllTasks(active);
    setDoneTask(done);
  };

  useEffect(() => {
    async function fetcAllTasks() {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get("/api/task", config);
        const data = response.data?.allTasks;
        setAllTasks(data);
        setIsLoading(false);
      } catch (error) {
        console.log("error occured", error);
        setIsLoading(false);
      }
    }
    fetcAllTasks();
  }, []);

  if (isLoading) {
    return <div>loading...</div>;
  } else {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Navbar
          setAllTasks={setAllTasks}
          allTasks={allTasks}
          taskId={taskId}
          setTaskId={setTaskId}
          taskTitle={taskTitle}
          taskDesc={taskDesc}
          setTaskTitle={setTaskTitle}
          setTaskDesc={setTaskDesc}
          open={open}
          setOpen={setOpen}
          setOpend={setOpend}
          opend={opend}
        />
        <Box
          px={{ xs: 3, sm: 0 }}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={{ xs: "column", sm: "row" }}
          gap={4}
          minHeight={"100vh"}
          mt={{ xs: 3, sm: 5 }}
        >
          <Droppable droppableId={"to-do"}>
            {(provided, snapshot) => (
              <Box
                ref={provided.innerRef}
                {...provided.droppableProps}
                sx={{
                  width: { xs: "100%", sm: 250 },
                  minHeight: { sm: 500 },
                  borderRadius: 3,
                  maxHeight: 500,
                  paddingX: 2,
                  paddingTop: 2,
                  overflow: "auto",
                  bgcolor: snapshot.isDraggingOver ? "#3b82f6" : "#e5e6e6",
                }}
              >
                <Header text={"to-do"} />
                <div style={{ marginTop: "12px" }}>
                  {Array.isArray(allTasks) &&
                    allTasks.map((task, index) => (
                      <SingleTask
                        key={task?._id}
                        index={index}
                        title={task?.title}
                        desc={task?.desc}
                        id={task?._id}
                        setTaskId={setTaskId}
                        setTaskTitle={setTaskTitle}
                        setTaskDesc={setTaskDesc}
                        task={"allTasks"}
                        setOpen={setOpen}
                        setOpend={setOpend}
                      />
                    ))}
                </div>
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
          <Droppable droppableId={"in-progress"}>
            {(provided, snapshot) => (
              <Box
                sx={{
                  width: { xs: "100%", sm: 250 },
                  minHeight: { sm: 500 },
                  maxHeight: 500,
                  borderRadius: 3,
                  paddingX: 2,
                  paddingTop: 2,
                  overflow: "auto",
                  bgcolor: snapshot.isDraggingOver ? "#22c55e" : "#e5e6e6",
                }}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <Header text={"in-progress"} />
                <div style={{ marginTop: "12px" }}>
                  {Array.isArray(inProgressTask) &&
                    inProgressTask.map((task, index) => (
                      <SingleTask
                        key={task?._id}
                        index={index}
                        title={task?.title}
                        desc={task?.desc}
                        id={task?._id}
                        setTaskId={setTaskId}
                        setTaskTitle={setTaskTitle}
                        setTaskDesc={setTaskDesc}
                      />
                    ))}
                </div>
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
          <Droppable droppableId={"done"}>
            {(provided, snapshot) => (
              <Box
                sx={{
                  width: { xs: "100%", sm: 250 },
                  minHeight: { sm: 500 },
                  maxHeight: 500,
                  borderRadius: 3,
                  paddingX: 2,
                  paddingTop: 2,
                  overflow: "auto",
                  bgcolor: snapshot.isDraggingOver ? "#ef4444" : "#e5e6e6",
                }}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <Header text={"DONE"} />
                <div style={{ marginTop: "12px" }}>
                  {Array.isArray(doneTask) &&
                    doneTask.map((task, index) => (
                      <SingleTask
                        key={task?._id}
                        index={index}
                        title={task?.title}
                        desc={task?.desc}
                        id={task?._id}
                        setTaskId={setTaskId}
                        setTaskTitle={setTaskTitle}
                        setTaskDesc={setTaskDesc}
                      />
                    ))}
                </div>
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </Box>
      </DragDropContext>
    );
  }
};

export default Container;

{
  /*I was encountering some problems with below type of rendering
   but it is working perfectly without react-beautiful-dnd*/
}

{
  /* <Hero id={"to-do"}>   
    <div className="mt-3">
      {Array.isArray(allTasks) &&
        allTasks.map((task, index) => (
          <SingleTask
            key={task._id}
            index={index}
            title={task.title}
            desc={task.desc}
            id={task._id}
            setTaskId={setTaskId}
            setTaskTitle={setTaskTitle}
            setTaskDesc={setTaskDesc}
          />
        ))}
    </div>
  </Hero> */
}
{
  /* <Hero id={"in-progress"}>
            <div className="mt-3">
              {Array.isArray(allTasks) &&
                inProgressTask.map((task, index) => (
                  <SingleTask
                    key={task._id}
                    index={index}
                    title={task.title}
                    desc={task.desc}
                    id={task._id}
                    setTaskId={setTaskId}
                    setTaskTitle={setTaskTitle}
                    setTaskDesc={setTaskDesc}
                  />
                ))}
            </div>
          </Hero> */
}
{
  /* <Hero id={"done"}>
            <div className="mt-3">
              {Array.isArray(allTasks) &&
                doneTask.map((task, index) => (
                  <SingleTask
                    key={task._id}
                    index={index}
                    title={task.title}
                    desc={task.desc}
                    id={task._id}
                    setTaskId={setTaskId}
                    setTaskTitle={setTaskTitle}
                    setTaskDesc={setTaskDesc}
                  /> nm
                ))}
            </div>
          </Hero> */
}
