import { TaskInterface } from "../api/types";
import { FaPencil, FaRegTrashCan } from "react-icons/fa6";
import Button from "./Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeTask } from "../api";
import { useMemo } from "react";
import { useState } from "react";
import TaskEditForm from "../forms/TaskEditForm";

interface TaskProps {
  task: TaskInterface;
}
function Task({ task }: TaskProps) {
  const [editMode, setEditMode] = useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync: removeTaskMutation } = useMutation({
    mutationFn: removeTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const handleRemoveTask = async () => {
    await removeTaskMutation(task);
  };
  const status = useMemo(() => {
    switch (task.status) {
      case "Pending":
        return (
          <div className="min-w-20 sm:min-w-32 px-2 py-1 bg-transparent border-2 border-yellow-300 text-yellow-300 flex justify-center items-center">
            Pending
          </div>
        );
        break;
      case "In Progress":
        return (
          <div className="min-w-20 sm:min-w-32 px-2 py-1 bg-transparent border-2 border-blue-400 text-blue-400 flex justify-center items-center">
            In Progress
          </div>
        );
        break;
      case "Completed":
        return (
          <div className="min-w-20 sm:min-w-32 px-2 py-1 bg-transparent border-2 border-green-500 text-green-500 flex justify-center items-center">
            Completed
          </div>
        );
        break;
      case "Archived":
        return (
          <div className="min-w-20 sm:min-w-32 px-2 py-1 bg-transparent border-2 border-gray-500 text-gray-500 flex justify-center items-center">
            Archived
          </div>
        );
        break;
      case "Review":
        return (
          <div className="min-w-20 sm:min-w-32 px-2 py-1 bg-transparent border-2 border-purple-500 text-purple-500 flex justify-center items-center">
            Review
          </div>
        );
        break;
      case "Cancelled":
        return (
          <div className="min-w-20 sm:min-w-32 px-2 py-1 bg-transparent border-2 border-red-500 text-red-500 flex justify-center items-center">
            Cancelled
          </div>
        );
        break;
      case "On Hold":
        return (
          <div className="min-w-20 sm:min-w-32 px-2 py-1 bg-transparent border-2 border-orange-400 text-orange-400 flex justify-center items-center">
            On Hold
          </div>
        );
        break;
    }
  }, [task]);

  return (
    <div className="w-full flex justify-between items-center border-b-2 text-gray-500 text-xs sm:text-sm md:text-base lg:text-xl">
      <div className="w-[10%] my-4 flex justify-center items-center font-medium">
        {task.taskNumber}
      </div>
      {editMode ? (
        <TaskEditForm task={task} onDiscard={() => setEditMode(false)} />
      ) : (
        <>
          <div className="w-[35%] flex justify-center items-center font-medium">
            {task.title}
          </div>
          <div className="w-[25%] flex justify-center items-center font-medium">
            {status}
          </div>
          <div className="w-[20%] flex justify-center items-center ">
            <Button
              onClick={() => setEditMode(true)}
              className="border-blue-500 ring-1 ring-blue-500 hover:ring-2 transition-all"
            >
              <FaPencil color="3b82f6" />
            </Button>
          </div>
        </>
      )}
      <div className="w-[10%] flex justify-center items-center ">
        <Button
          onClick={handleRemoveTask}
          className="border-gray-500 ring-1 ring-gray-500 hover:ring-2 transition-all"
        >
          <FaRegTrashCan color="6b7280" />
        </Button>
      </div>
    </div>
  );
}
export default Task;
