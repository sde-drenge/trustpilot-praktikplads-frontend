interface User {
  id: string
  name: string
  email: string
  role: Role
  createdAt: string
  updatedAt?: string
  school: School[]
}

enum Role {
  'student',
  'teacher',
  'admin',
}
