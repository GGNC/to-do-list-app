import axios from "axios";
import { TaskInterface, UserInterface } from "./types";

const TASK_URL = "http://localhost:5000/tasks";

export const getAllTasks = async (
  user: UserInterface | undefined
): Promise<TaskInterface[]> => {
  const response = await axios.get(`${TASK_URL}?userId=${user?.id}`);
  return response.data || [];
};

export const addTask = async (task: TaskInterface): Promise<TaskInterface> => {
  const response = await axios.get<TaskInterface[]>(
    `${TASK_URL}?userId=${task.userId}`
  );
  const tasks = response.data;

  const nextTaskNumber =
    tasks.length > 0 ? Math.max(...tasks.map((t) => t.taskNumber || 0)) + 1 : 1;

  const result = await axios.post(`${TASK_URL}`, {
    ...task,
    taskNumber: nextTaskNumber,
  });
  return result.data || [];
};

export const removeTask = async (
  task: TaskInterface
): Promise<TaskInterface> => {
  const response = await axios.delete(`${TASK_URL}/${task.id}`);
  return response.data;
};

export const editTask = async (task: TaskInterface): Promise<TaskInterface> => {
  const response = await axios.put(`${TASK_URL}/${task.id}`, {
    ...task,
  });
  return response.data;
};
