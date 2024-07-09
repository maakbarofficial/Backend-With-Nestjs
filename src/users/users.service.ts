import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "Alice Johnson",
            "email": "alice.johnson@example.com",
            "role": "ADMIN"
        },
        {
            "id": 2,
            "name": "Bob Smith",
            "email": "bob.smith@example.com",
            "role": "USER"
        },
        {
            "id": 3,
            "name": "Charlie Brown",
            "email": "charlie.brown@example.com",
            "role": "HR"
        },
        {
            "id": 4,
            "name": "Diana Prince",
            "email": "diana.prince@example.com",
            "role": "ADMIN"
        },
        {
            "id": 5,
            "name": "Eve Adams",
            "email": "eve.adams@example.com",
            "role": "USER"
        },
        {
            "id": 6,
            "name": "Franklin Wright",
            "email": "franklin.wright@example.com",
            "role": "HR"
        },
        {
            "id": 7,
            "name": "Grace Hopper",
            "email": "grace.hopper@example.com",
            "role": "ADMIN"
        },
        {
            "id": 8,
            "name": "Hank Green",
            "email": "hank.green@example.com",
            "role": "USER"
        },
        {
            "id": 9,
            "name": "Isabel Allende",
            "email": "isabel.allende@example.com",
            "role": "HR"
        },
        {
            "id": 10,
            "name": "Jack Ryan",
            "email": "jack.ryan@example.com",
            "role": "USER"
        }
    ]



    findAll(role?: 'ADMIN' | 'HR' | 'USER') {
        if (role) {
            const rolesArray = this.users.filter(user => user.role === role)

            if (rolesArray.length === 0) throw new NotFoundException("User role not found")

            return rolesArray
        }
        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)

        if (!user) throw new NotFoundException("User not found")

        return user
    }

    create(createUserDto: CreateUserDto) {
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id)

        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...createUserDto
        }
        this.users.push(newUser)

        return newUser
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updateUserDto }
            }
            return user
        })

        return this.findOne(id)
    }

    delete(id: number) {
        const removedUser = this.findOne(id)
        this.users = this.users.filter(user => user.id !== id)

        return removedUser
    }
}
