import clientPromise from '../mongodb'

export async function createOAuthUser({
  name,
  email,
  clerkId,
}: {
  name: string
  email: string
  clerkId: string
}) {
  const client = await clientPromise
  const db = client.db('mydb')
  const users = db.collection('users')

  // Проверка, есть ли уже такой пользователь по clerkId или email
  const existingUser = await users.findOne({ $or: [{ clerkId }, { email }] })
  if (existingUser) return existingUser

  const newUser = {
    name,
    email,
    clerkId,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const result = await users.insertOne(newUser)

  return {
    id: result.insertedId.toString(),
    ...newUser,
  }
}
