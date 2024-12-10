// import { useDroppable } from "@dnd-kit/core";

// export default function DeleteTask() {
//   const { isOver, setNodeRef } = useDroppable({
//     id: "delete-area",
//   });

//   const style:any = {
//     backgroundColor: isOver ? "red" : "black",
//     color: "white",
//     padding: "10px",
//     borderRadius: "8px",
//     width:"300px",
//     height:"100px"
//   };

//   return (
//     <div  ref={setNodeRef} style={style} className="delete-area flex justify-center items-center">
//       Drag here to delete
//     </div>
//   );
// }


import { useDroppable } from "@dnd-kit/core";
import { Task } from "../types/kanban";

export default function DeleteTask({ tasks, setTasks }: { tasks: Task[]; setTasks: React.Dispatch<React.SetStateAction<Task[]>> }) {
  const { isOver, setNodeRef ,active} = useDroppable({
    id: "delete-area",
  });

  const style: React.CSSProperties = {
    backgroundColor: isOver ? "red" : "black",
    color: "white",
    padding: "10px",
    borderRadius: "8px",
    width: "300px",
    height: "100px",
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  if (active && isOver) {
    const taskId = active.id as string;
    handleDelete(taskId);
  }
  return (
    <div ref={setNodeRef} style={style} className="delete-area flex justify-center items-center">
      Drag here to delete
    </div>
  );
}
