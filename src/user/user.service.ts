import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }


  async editUser(
    userId: number,
    dto: EditUserDto,
  ) {

    // generate the password hash
    const hash = await argon.hash(dto.password);

    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        email: dto.email,
        hash,
        firstName: dto.firstName,
        lastName: dto.lastName
      },
    });

    delete user.hash;

    return user;
  }
}
