import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from './dto';
import * as argon from 'argon2';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        email: true,
        userRole: true,
        firstName: true,
        lastName: true,        
      },
    });
  }

  async editUser(
    loggedInUser: User, // Correctly typed user object
    userId: number,
    dto: EditUserDto,
  ) {
    const userToUpdate = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userToUpdate) {
      throw new NotFoundException('User not found');
    }

    // Check if the logged-in user is admin or is updating their own details
    if (loggedInUser.userRole !== 'admin' && loggedInUser.id !== userId) {
      throw new UnauthorizedException('You are not authorized to edit this user');
    }

    const hash = await argon.hash(dto.password);

    const updatedUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        email: dto.email,
        hash,
        firstName: dto.firstName,
        lastName: dto.lastName,
      },
    });

    delete updatedUser.hash;

    return updatedUser;
  }
}
