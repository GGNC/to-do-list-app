export interface UserInterface {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  tasks?: TaskInterface[];
}

export interface TaskInterface {
  title?: string;
}
