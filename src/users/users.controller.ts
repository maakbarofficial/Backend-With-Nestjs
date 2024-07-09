import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

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
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findOne(id)
    }

    @Post()     // POST /users
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto)
    }

    @Patch(':id')     // PATCH /users/:id
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto)
    }

    @Delete(':id')     // DELETE /users/:id
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.userService.delete(id)
    }
}
