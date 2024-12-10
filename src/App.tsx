import { useState } from "react";
import type { Task, Column as ColumnType } from "./types/kanban";
import { Column } from "./components/Column";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import INITIAL_TASKS from "./utils/LocalStorage";
import AddTask from "./components/AddTask";

const COLUMNS: ColumnType[] = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    setTasks(() =>
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task
      )
    );
  }

  return (
    <>
      <div className=" bg-slate-800 w-[100%] h-[100vh]">
        <h1 className=" flex justify-center items-center text-4xl p-4">Kanban Board</h1>
        <AddTask></AddTask>
        <div className="flex justify-center items-center p-4">
          <div className="flex gap-8">
            <DndContext onDragEnd={handleDragEnd}>
              {COLUMNS.map((column) => {
                return (
                  <Column
                    key={column.id}
                    column={column}
                    tasks={tasks.filter((task) => task.status === column.id)}
                  />
                );
              })}
            </DndContext>
          </div>
        </div>
      </div>
    </>
  );
}
