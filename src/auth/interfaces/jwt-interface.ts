export default interface JwtInterface  {
  id?: string;
  email: string;
  role?: 'Employee' | 'Admin' | 'ProjectManager';
}
