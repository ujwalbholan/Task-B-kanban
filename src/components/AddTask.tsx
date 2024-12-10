import { Task } from "../types/kanban";
import DeleteTask from "./DeleteTask";
import INITIAL_TASKS from "../utils/LocalStorage";


type AddTask = {
  task: Task;
};

export default function AddTask() {

  const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let from = event.target as HTMLFormElement;
    const formData = new FormData(from);
    const newid = INITIAL_TASKS.length > 0 ?(parseInt(INITIAL_TASKS[INITIAL_TASKS.length - 1].id) + 1).toString() : "1";
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const status = formData.get("radio") as "TODO" | "IN_PROGRESS" | "DONE";

    const newTask: Task = {  id:newid, title, description, status };

    INITIAL_TASKS.push(newTask);

    console.log(INITIAL_TASKS);

    event.currentTarget.reset();
  };
  return (
    <>
     <div className=" flex justify-center items-center">
     {/* < DeleteTask/> */}
      <form
        className="rounded-md flex justify-center items-center gap-3 bg-slate-700 m-3 p-5 max-w-[auto] text-white"
        onSubmit={handleForm}
      >
        <input className=" p-2 m-2 rounded-md bg-slate-500" name="title" type="text" />
        Title
        <input className=" p-2 m-2 rounded-md bg-gray-500" name="description" type="text" />
        description
        <input type="radio" name="radio" value={"TODO"} id="TODO" />
        TODO
        <input type="radio" name="radio" value={"IN_PROGRESS"} id="IN_PROGRESS" />
        IN_PROGRESS
        <input type="radio" name="radio" value={"DONE"} id="DONE" />
        DONE
        <button
          className=" bg-gray-600 rounded-md p-3 hover:bg-gray-400"
          type="submit"
        >
          Add task
        </button>
      </form>
     </div>
     
    </>
  );
}
