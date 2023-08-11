import { Body, Controller, Get, Param, ParseIntPipe, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';
import { EditUserDto } from './dto';
import { RolesGuard } from './guard';
import { Roles } from './decorator';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {

  constructor(private userService: UserService) { }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get()
  getAllUser() {
    return this.userService.getAllUsers();
  }

  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch(':id')
  editUser(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) userId: number,
    @Body() dto: EditUserDto,
  ) {
    return this.userService.editUser(user, userId, dto);
  }
}
