import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword)
}

export async function createUser(data: {
  email: string
  username: string
  password: string
  role: UserRole
  firstName: string
  lastName: string
  phoneNumber?: string
  address?: string
  specialization?: string
  licenseNumber?: string
}) {
  const hashedPassword = await hashPassword(data.password)
  
  const user = await prisma.user.create({
    data: {
      email: data.email,
      username: data.username,
      password: hashedPassword,
      role: data.role,
      ...(data.role === 'CLIENT' && {
        client: {
          create: {
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            address: data.address,
          },
        },
      }),
      ...(data.role === 'DOCTOR' && {
        doctor: {
          create: {
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            address: data.address,
            specialization: data.specialization!,
            licenseNumber: data.licenseNumber!,
          },
        },
      }),
    },
  })

  return user
} 