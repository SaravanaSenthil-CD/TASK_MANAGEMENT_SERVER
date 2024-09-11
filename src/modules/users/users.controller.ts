import { Body, Controller, Delete, Get, Logger, NotFoundException, Param, Post, Put, InternalServerErrorException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { JwtAuthGuard } from './auth/user.auth.gaurd';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly userService: UsersService) {}

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDTO) {
    try {
      this.logger.log('Creating a new user');
      const user = await this.userService.create(createUserDto);
      return {
        message: 'User created successfully',
        data: user,
      };
    } catch (error) {
      this.logger.error('Error creating user');
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  @Post('login')
  async logIn(
    @Body('email') email:string,
    @Body('password') password:string
){
  try{
    const result = await this.userService.logIn(email,password);
    return result
  }catch(error){
    throw new UnauthorizedException('Login failed, please check your credentials');
  }
}


  @Get()
  async findAll() {
    try {
      this.logger.log('Fetching all users');
      const users = await this.userService.findAll();
      return {
        message: 'Users fetched successfully',
        data: users,
      };
    } catch (error) {
      this.logger.error('Error fetching users');
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      this.logger.log(`Fetching user with ID ${id}`);
      const user = await this.userService.findOne(id);

      if (!user) {
        this.logger.warn(`User with ID ${id} not found`);
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return {
        message: `User with ID ${id} fetched successfully`,
        data: user,
      };
    } catch (error) {
      this.logger.error(`Error fetching user with ID ${id}`);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(`Failed to fetch user with ID ${id}`);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: CreateUserDTO) {
    try {
      this.logger.log(`Updating user with ID ${id}`);
      const updatedUser = await this.userService.update(id, updateUserDto);

      if (!updatedUser) {
        this.logger.warn(`User with ID ${id} not found`);
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return {
        message: `User with ID ${id} updated successfully`,
        data: updatedUser,
      };
    } catch (error) {
      this.logger.error(`Error updating user with ID ${id}`);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(`Failed to update user with ID ${id}`);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      this.logger.log(`Removing user with ID ${id}`);
      const user = await this.userService.findOne(id);

      if (!user) {
        this.logger.warn(`User with ID ${id} not found`);
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      await this.userService.remove(id);
      return {
        message: `User with ID ${id} deleted successfully`,
      };
    } catch (error) {
      this.logger.error(`Error removing user with ID ${id}`);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(`Failed to delete user with ID ${id}`);
    }
  }
}
