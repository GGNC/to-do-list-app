import { useQuery } from "@tanstack/react-query";
import { TaskInterface, UserInterface } from "../api/types";
import { getAllTasks } from "../api";
import { useMemo } from "react";
import Task from "./Task";
import Skeleton from "./Skeleton";

interface TaskListProps {
  user: UserInterface | undefined;
}
function TaskList({ user }: TaskListProps) {
  const { data: tasks, isLoading } = useQuery<TaskInterface[]>({
    queryKey: ["tasks"],
    queryFn: () => getAllTasks(user),
    enabled: !!user,
  });
  const renderedTasks = useMemo(() => {
    const tempTasks = tasks?.map((task) => {
      return <Task key={task.id} task={task} />;
    });
    return tempTasks;
  }, [tasks]);
  return (
    <div className="container mt-6 my-24 min-h-[400px] px-4 py-4 bg-white rounded-t-3xl rounded-b-xl shadow-2xl">
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
    </div>
  );
}
export default TaskList;
