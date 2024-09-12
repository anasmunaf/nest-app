import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly dataBaseService: DatabaseService) {}

  userDB = this.dataBaseService.user;

  async create(createEmployeeDto: Prisma.UserCreateInput) {
    return this.userDB.create({
      data: createEmployeeDto,
    });
  }

  async findAll(role?: Prisma.UserCreateInput['role']) {
    const data = this.userDB.findMany({
      where: {
        role: {
          equals: role,
        },
      },
    });

    return data;
  }

  async findOne(id: number) {
    return this.userDB.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateEmployeeDto: Prisma.UserUpdateInput) {
    return this.userDB.update({
      data: updateEmployeeDto,
      where: {
        id: id,
      },
    });
  }

  async remove(id: number) {
    return this.userDB.delete({
      where: {
        id: id,
      },
    });
  }
}
