import NavigationBar from "../components/NavigationBar";
import { useQuery } from "@tanstack/react-query";
import { UserInterface } from "../api/types";
import TaskList from "../components/TaskList";
function TaskpadPage() {
  const { data: user } = useQuery<UserInterface>({ queryKey: ["user"] });

  return (
    <div className="container min-w-96 mx-auto flex flex-col justify-center items-center ">
      <NavigationBar />
      <TaskList user={user} />
    </div>
  );
}
export default TaskpadPage;
