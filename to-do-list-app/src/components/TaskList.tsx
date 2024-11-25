import { useQuery } from "@tanstack/react-query";
import { TaskInterface, UserInterface } from "../api/types";
import { getAllTasks } from "../api";
import { useMemo, useState } from "react";
import Task from "./Task";
import Skeleton from "./Skeleton";
import SearchBar from "./SearchBar";
import Button from "./Button";
import TaskForm from "../forms/TaskForm";
import useWindowSize from "../hooks/useWindowSize";
import { FaFileMedical } from "react-icons/fa6";

interface TaskListProps {
  user: UserInterface | undefined;
}
function TaskList({ user }: TaskListProps) {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const windowSize = useWindowSize();
  const { data: tasks, isLoading } = useQuery<TaskInterface[]>({
    queryKey: ["tasks"],
    queryFn: () => getAllTasks(user),
    enabled: !!user,
  });
  const handleOpenTaskForm = () => {
    setShowTaskForm(true);
  };
  const handleCloseTaskForm = () => {
    setShowTaskForm(false);
  };
  const renderedTasks = useMemo(() => {
    const tempTasks = tasks
      ?.filter((task) => {
        return task.title
          .toLowerCase()
          .includes(searchTerm.trim().toLowerCase());
      })
      .map((task) => {
        return <Task key={task.id} task={task} />;
      });
    return tempTasks;
  }, [tasks, searchTerm]);
  return (
    <div className="container mt-6 min-h-[400px] px-4 py-4 bg-white rounded-t-3xl rounded-b-xl shadow-2xl">
      <div className="flex justify-between items-center mt-1 mb-4 px-2 md:px-4 lg:px-8">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Button
          warning
          rounded
          className={`border-4 border-slate-200 ring-2 ring-yellow-700 shadow-2xl hover:ring-4 hover:ring-yellow-500 hover:shadow-3xl transition-all
            ${windowSize.width <= 500 ? "w-12" : "w-28"}`}
          onClick={handleOpenTaskForm}
        >
          {windowSize.width <= 500 ? <FaFileMedical /> : <p>Add Task</p>}
        </Button>
      </div>
      <div className="flex justify-between items-center border-b-2 border-black text-xs sm:text-sm md:text-base lg:text-xl">
        <p className="w-[10%] flex justify-center items-center font-extrabold">
          #
        </p>
        <p className="w-[35%] flex justify-center items-center font-extrabold">
          Task Name
        </p>
        <p className="w-[25%] flex justify-center items-center font-extrabold">
          Status
        </p>
        <p className="w-[20%] flex justify-center items-center font-extrabold">
          Edit
        </p>
        <p className="w-[10%] flex justify-center items-center font-extrabold">
          Delete
        </p>
      </div>
      <div className="w-full h-full flex flex-col justify-center items-center">
        {isLoading ? (
          <Skeleton amount={3} />
        ) : renderedTasks?.length ? (
          renderedTasks
        ) : searchTerm.trim() ? (
          <div className="m-14 flex flex-col justify-center items-center font-bold text-sm text-gray-500">
            <p>You dont have any tasks with that name</p>
          </div>
        ) : (
          <div className="m-14 flex flex-col justify-center items-center font-bold text-sm text-gray-500">
            <p>You dont have any tasks yet</p>
            <div className="flex justify-center items-center gap-2 ">
              <p>press</p>
              <span className="w-12 h-4 bg-yellow-400 rounded-xl border-2 border-slate-100 ring-2 ring-yellow-600"></span>
              <p>above to add a task</p>
            </div>
          </div>
        )}
      </div>
      {showTaskForm && <TaskForm user={user!} onClose={handleCloseTaskForm} />}
    </div>
  );
}
export default TaskList;
