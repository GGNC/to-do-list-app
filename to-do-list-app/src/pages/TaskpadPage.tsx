import { useState } from "react";
import NavigationBar from "../components/NavigationBar";
import Button from "../components/Button";
import { useQuery } from "@tanstack/react-query";
import { UserInterface } from "../api/types";
import TaskList from "../components/TaskList";
import TaskForm from "../forms/TaskForm";
function TaskpadPage() {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const { data: user } = useQuery<UserInterface>({ queryKey: ["user"] });

  const handleOpenTaskForm = () => {
    setShowTaskForm(true);
  };
  const handleCloseTaskForm = () => {
    setShowTaskForm(false);
  };

  return (
    <div className="container min-w-96 mx-auto flex flex-col justify-center items-center ">
      <NavigationBar />
      <Button
        className="m-4 mt-6 w-48 h-12 text-2xl font-extrabold border-4 border-slate-200 ring-4 ring-yellow-600 shadow-2xl hover:ring-8 hover:ring-yellow-500 hover:shadow-3xl transition-all"
        warning
        rounded
        onClick={handleOpenTaskForm}
      >
        Add Task
      </Button>
      <TaskList user={user} />
      {showTaskForm && <TaskForm user={user!} onClose={handleCloseTaskForm} />}
    </div>
  );
}
export default TaskpadPage;
