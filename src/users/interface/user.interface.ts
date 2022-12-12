export default interface UserInterface  {
  id?: string;
  username: string;
  email: string;
  password?: string;
  role?: 'Employee' | 'Admin' | 'ProjectManager';
}
