import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Query,
  Param,
  Delete,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { User } from './model/user.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('user')
@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/add-user')
  async createUser(@Body() body: UserDto): Promise<User> {
    let user = await this.userService.getByEmail(body.email);
    if (user) {
      console.log('User already exists');
    }

    return this.userService.create(body);
  }

  // @ApiBearerAuth('access-token')
  // @UseGuards(JwtAuthGuard)
  @Get('/get-user/:id')
  getUser(@Param('id') id: number) {
    console.log('id:', id);
    return this.userService.findOne(id);
  }

  @Get('/getAllUser')
  getAll() {
    return this.userService.findAll();
  }
}
