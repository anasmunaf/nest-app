import { Injectable } from '@nestjs/common';

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

  findAll(role?: 'Admin' | 'User' | 'Moderator') {
    if (role) return this.users.filter((item) => role === item.role);

    return this.users;
  }

  findOne(id: number) {
    return this.users.find((item) => item.id === id);
  }

  create(user: { name: string; email: string; role: string }) {
    const sortedUser = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = { id: sortedUser[0].id + 1, ...user };
    return this.users.push(newUser);
  }

  update(id: number, user: { name: string; email: string; role: string }) {
    const num = this.users.findIndex((item) => item.id === id);
    this.users[num] = { ...this.users[num], ...user };
    return this.users;
  }

  delete(id: number) {
    const num = this.users.findIndex((item) => item.id === id);
    delete this.users[num];
    this.users = this.users.filter((item) => item);
    return this.users;
  }
}
