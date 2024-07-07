import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'User',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      role: 'Moderator',
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      role: 'Admin',
    },
    {
      id: 5,
      name: 'William Brown',
      email: 'william.brown@example.com',
      role: 'User',
    },
  ];

  findAll(role?: CreateUserDto['role']) {
    if (role) {
      const user = this.users.filter((item) => role === item.role);
      if (!user.length) throw new NotFoundException('Invalid role!');
    }
    return this.users;
  }

  findOne(id: CreateUserDto['id']) {
    const user = this.users.find((item) => item.id === id);
    if (!user) throw new NotFoundException('Invalid request!');
    return user;
  }

  create(user: CreateUserDto) {
    const sortedUser = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = { id: sortedUser[0].id + 1, ...user };
    return this.users.push(newUser);
  }

  update(id: UpdateUserDto['id'], user: UpdateUserDto) {
    const num = this.users.findIndex((item) => item.id === id);
    if (num === -1) throw new NotFoundException('User not found');
    this.users[num] = { ...this.users[num], ...user };
    return this.users;
  }

  delete(id: CreateUserDto['id']) {
    const num = this.users.findIndex((item) => item.id === id);
    if (num === -1) throw new NotFoundException('User not found');

    delete this.users[num];
    this.users = this.users.filter((item) => item);
    return this.users;
  }
}
