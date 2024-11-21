export interface UserInterface {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface TaskInterface {
  id?: string;
  userId: string;
  taskNumber?: number;
  title: string;
  status:
    | "Pending"
    | "In Progress"
    | "Completed"
    | "Archived"
    | "Review"
    | "Cancelled"
    | "On Hold";
}
