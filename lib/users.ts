export type AppUser = {
  id: string
  email: string
  password: string
  name: string
  schoolId?: string
}

const users: AppUser[] = [
  { id: '1', email: 'test@test.dk', password: 'Arn52bvk!', name: 'Test Bruger' },
]

export function findUser(email: string, password?: string) {
  if (password !== undefined) return users.find((u) => u.email === email && u.password === password)
  return users.find((u) => u.email === email)
}

export function addUser(email: string, password: string, name?: string, schoolId?: string) {
  const user: AppUser = {
    id: String(users.length + 1),
    email,
    password,
    name: name ?? email.split('@')[0],
    schoolId,
  }
  users.push(user)
  return user
}

export { users }
