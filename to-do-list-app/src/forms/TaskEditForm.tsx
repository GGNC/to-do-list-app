import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { z } from "zod";
import { editTask } from "../api";
import { TaskInterface } from "../api/types";
import Button from "../components/Button";

interface TaskEditFormProps {
  task: TaskInterface;
  onDiscard: () => void;
}
const schema = z.object({
  title: z
    .string()
    .min(1, { message: "Please enter a title for your task." })
    .max(20, { message: "Task name can contain up to 20 characters" }),
  status: z.enum(
    [
      "Pending",
      "In Progress",
      "Completed",
      "Archived",
      "Review",
      "Cancelled",
      "On Hold",
    ],
    {
      errorMap: () => ({ message: "Please select a valid status." }),
    }
  ),
});
type FormFields = z.infer<typeof schema>;

function TaskEditForm({ task, onDiscard }: TaskEditFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: task.title,
      status: task.status,
    },
  });
  const queryClient = useQueryClient();
  const { mutateAsync: addTaskMutation } = useMutation({
    mutationFn: editTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await addTaskMutation({
      ...task,
      title: data.title,
      status: data.status,
    });
    onDiscard();
  };
  return (
    <form
      className="w-[80%] flex justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-[43.75%] flex flex-col justify-center items-center">
        {errors.title && (
          <p className="text-red-600 text-[8px]">{errors.title.message}</p>
        )}
        <input
          type="text"
          {...register("title")}
          className="w-[80%] text-[6px] lg:text-sm px-2 py-1 lg:px-4 lg:py-2 rounded-2xl border-2 border-slate-200"
        />
      </div>
      <div className="w-[31.25%] flex flex-col justify-center items-center">
        {errors.status && (
          <p className="text-red-600 text-[8px]">{errors.status.message}</p>
        )}
        <select
          {...register("status")}
          className="w-[80%] text-[8px] lg:text-sm px-2 py-1 rounded-2xl border-2 border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
        >
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="On Hold">On Hold</option>ß
          <option value="Completed">Completed</option>ß
          <option value="Cancelled">Cancelled</option>ß
          <option value="Review">Review</option>ß
          <option value="Archived">Archived</option>ß
        </select>
      </div>
      <div className="w-[25%] flex flex-col justify-center items-center">
        <div className="flex justify-center items-center gap-2">
          <Button
            type="submit"
            loading={isLoading}
            className="w-[30px] sm:w-12  border-green-500 ring-1 ring-green-500 hover:ring-2 transition-all"
          >
            <FaCheck color="22c55e" />
          </Button>
          <Button
            onClick={onDiscard}
            loading={isLoading}
            className="w-[30px] sm:w-12  border-red-500 ring-1 ring-red-500 hover:ring-2 transition-all"
          >
            <FaXmark color="ef4444" />
          </Button>
        </div>
      </div>
    </form>
  );
}
export default TaskEditForm;
