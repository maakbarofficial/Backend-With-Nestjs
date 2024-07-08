import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get()     // GET /users or /users?role=value this is optional
    findAll(@Query('role') role?: 'ADMIN' | 'HR' | 'USER') {
        return role
    }

    // @Get('admin') // GET /users/admin -> This GET will not work properly if it puts after :id route
    // findAllAdmin() {
    //     return []
    // }

    @Get(':id') //GET /users/:id
    findOne(@Param('id') id: String) {
        return { id }
    }

    @Post()     // POST /users
    create(@Body() user: {}) {
        return user
    }

    @Patch(':id')     // PATCH /users/:id
    update(@Param('id') id: string, @Body() userUpdate: {}) {
        return { id, ...userUpdate }
    }

    @Delete(':id')     // DELETE /users/:id
    delete(@Param('id') id: string) {
        return { id }
    }
}
