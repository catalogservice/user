import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { createUserResponseDto } from './dto/createResponse.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('user')
export class UserController {
    constructor(
        private userService: UserService
    ) { }

    @Get()
    async getAllUsers(): Promise<createUserResponseDto[]> {
        let users = await this.userService.getUser() as any;
        let response: createUserResponseDto[] = [];
        users.forEach(user => {
            let item: createUserResponseDto = {
                username: user.username,
                id: user._id,
                first_name: user.first_name,
                last_name: user.last_name
            };
            response.push(item);
        })
        return response;
    }

    @Get('me')
    getCurrentUser(): string {
        return 'get current user'
    }

    @Get(":username")
    async getUserByUsername(@Param('username') username: string): Promise<any> {
        let response = await this.userService.getUserByUsername(username);
        if (!response) return 'no user found';
        return response
    }

    @Post()
    async createUser(@Body() body: CreateUserDto): Promise<createUserResponseDto> {
        let newUser = await this.userService.createUser(body) as any;
        let response: createUserResponseDto = {
            username: newUser.username,
            id: newUser._id,
            first_name: newUser.first_name,
            last_name: newUser.last_name
        }
        return response;
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<any> {
        return await this.userService.deleteUser(id)

    }

    @EventPattern('NEW USER')
    async createUserAMQ(data:any){
        this.userService.createUser( JSON.parse(data))
    }
}
