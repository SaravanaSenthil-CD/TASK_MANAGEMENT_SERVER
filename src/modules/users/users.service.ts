import { ConflictException, Injectable, NotFoundException, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { user } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name); 

  constructor(
    @InjectRepository(user)
    private readonly userRepository: Repository<user>, 
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDTO): Promise<user> {
    try {
      this.logger.log('Creating a new user');
      
      const existingUser = await this.userRepository.findOne({
        where: [
          { username: createUserDto.username },
          { email: createUserDto.email },
        ],
      });

      if (existingUser) {
        this.logger.warn('User with this username or email already exists');
        throw new ConflictException('User with this username or email already exists');
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const user = this.userRepository.create({ ...createUserDto, password: hashedPassword });
      return await this.userRepository.save(user);
    } catch (error) {
      this.logger.error('Error creating user');
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async validateUser(email:string,password:string):Promise<user>{
    const user = await this.userRepository.findOne({where:{email}});

    if(user && (await bcrypt.compare(password,user.password))){
      return user;
    }
    throw new UnauthorizedException('Injvaild credentials')
  }

  async logIn(email:string,password:string){
    const user =await this.validateUser(email,password);
    const payload = {sub:user.id,email:user.email};
    return{
      access_token:this.jwtService.sign(payload)
    }
  }

  async findAll(): Promise<user[]> {
    try {
      this.logger.log('Fetching all users');
      return await this.userRepository.find();
    } catch (error) {
      this.logger.error('Error fetching users');
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }

  async findOne(id: string): Promise<user> {
    try {
      this.logger.log(`Fetching user with ID ${id}`);
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        this.logger.warn(`User with ID ${id} not found`);
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return user;
    } catch (error) {
      this.logger.error(`Error fetching user with ID ${id}`);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch user');
    }
  }

  async update(id: string, updateUserDto: CreateUserDTO): Promise<Partial<user>> {
    try {
      this.logger.log(`Updating user with ID ${id}`);
      const user = await this.userRepository.findOneBy({ id });

      if (!user) {
        this.logger.warn(`User with ID ${id} not found`);
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      if (updateUserDto.password) {
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
      }

      await this.userRepository.update(id, updateUserDto);
      return await this.userRepository.findOneBy({ id });
    } catch (error) {
      this.logger.error(`Error updating user with ID ${id}`);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      this.logger.log(`Removing user with ID ${id}`);
      const user = await this.userRepository.findOneBy({ id });

      if (!user) {
        this.logger.warn(`User with ID ${id} not found`);
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      await this.userRepository.delete(id);
      this.logger.log(`User with ID ${id} deleted successfully`);
    } catch (error) {
      this.logger.error(`Error removing user with ID ${id}`);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete user');
    }
  }
}
