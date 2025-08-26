export interface CreateStudentInput {
  name: string;
  email: string;
  password_hash: string;
  age: number;
  class_id?: string;
}
