import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    @Get()     // GET /users or /users?role=value this is optional
    findAll(@Query('role') role?: 'ADMIN' | 'HR' | 'USER') {
        return this.userService.findAll(role)
    }

    // @Get('admin') // GET /users/admin -> This GET will not work properly if it puts after :id route
    // findAllAdmin() {
    //     return []
    // }

    @Get(':id') //GET /users/:id
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id) // Unary Plus (+) Convert string to number
    }

    @Post()     // POST /users
    create(@Body() user: { name: string, email: string, role: 'ADMIN' | 'HR' | 'USER' }) {
        return this.userService.create(user)
    }

    @Patch(':id')     // PATCH /users/:id
    update(@Param('id') id: number, @Body() userUpdate: { name: string, email: string, role: 'ADMIN' | 'HR' | 'USER' }) {
        return this.userService.update(id, userUpdate)
    }

    @Delete(':id')     // DELETE /users/:id
    delete(@Param('id') id: string) {
        return this.userService.delete(+id)
    }
}
