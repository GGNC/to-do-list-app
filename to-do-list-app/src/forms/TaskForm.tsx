import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addTask } from "../api";
import { UserInterface } from "../api/types";
import Modal from "../components/Modal";
import Button from "../components/Button";
import { FaFileCirclePlus, FaRotateLeft } from "react-icons/fa6";
import useWindowSize from "../hooks/useWindowSize";

interface TaskFormProps {
  user: UserInterface;
  onClose: () => void;
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

function TaskForm({ user, onClose }: TaskFormProps) {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });
  const queryClient = useQueryClient();
  const windowSize = useWindowSize();
  const { mutateAsync: addTaskMutation } = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await addTaskMutation({
      userId: user.id,
      title: data.title,
      status: data.status,
    });
    onClose();
  };
  const resetFields = () => {
    resetField("title");
    resetField("status");
  };
  return (
    <Modal onClose={onClose}>
      <div className="-mt-12 px-8 py-4 bg-white border-4 border-slate-200 rounded-xl ">
        <p className="font-[1000] text-xl sm:text-2xl lg:text-4xl text-transparent bg-gradient-to-r from-[#fa5252] to-[#fd7e14] bg-clip-text">
          ADD NEW TASK
        </p>
      </div>
      <form
        className="w-full px-8 py-2 mt-4 flex flex-col justify-center items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full flex items-end justify-end">
          {errors.title && (
            <p className="text-red-600 text-[10px]">{errors.title.message}</p>
          )}
        </div>
        <div className="w-full mb-2 flex flex-nowrap justify-center items-center ">
          <p className="w-2/5 font-bold text-base md:text-lg lg:text-2xl">
            Task Name
          </p>
          <input
            type="text"
            {...register("title")}
            className="h-10 md:h-12 lg:h-14 w-3/5 px-4 py-2 rounded-2xl border-2 border-slate-200 text-xs md:text-base lg:text-lg"
            placeholder="Do Homework"
          />
        </div>
        <div className="w-full flex items-end justify-end">
          {errors.status && (
            <p className="text-red-600 text-[10px]">{errors.status.message}</p>
          )}
        </div>
        <div className="w-full mb-2 flex flex-nowrap justify-center items-center ">
          <p className="w-2/5 font-bold text-base md:text-lg lg:text-2xl">
            Task Status
          </p>
          <select
            {...register("status")}
            className="text-xs md:text-base lg:text-lg w-3/5 h-10 md:h-12 lg:h-14 px-4 py-2 rounded-2xl border-2 border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bottom-16 top-16"
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

        {errors.root && <p className="text-red-600">{errors.root.message}</p>}
        <div className="mt-6 flex justify-between items-center gap-12">
          <Button
            onClick={resetFields}
            rounded
            className="text-xs md:text-sm lg:text-lg xl:text-xl text-white bg-red-500 font-extrabold border-4 border-slate-200 ring-4 ring-red-700 shadow-2xl hover:ring-8 hover:ring-red-500 hover:shadow-3xl transition-all"
          >
            {windowSize.width < 500 ? <FaRotateLeft size={35} /> : "Reset Task"}
          </Button>
          <Button
            type="submit"
            rounded
            className="text-xs md:text-sm lg:text-lg xl:text-xl text-white bg-orange-500 font-extrabold border-4 border-slate-200 ring-4 ring-orange-700 shadow-2xl hover:ring-8 hover:ring-orange-500 hover:shadow-3xl transition-all"
          >
            {windowSize.width < 500 ? (
              <FaFileCirclePlus size={35} />
            ) : (
              "Add Task"
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
export default TaskForm;
