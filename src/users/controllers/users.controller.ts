import { Body, Controller, Get, Param, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ValidationError, ValidatorOptions } from 'class-validator';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { CreateUserDto } from '../dto/create_user.dto';
import { AuthService } from '../../auth/services/auth.service';
import { UserService } from '../services/user.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { LoginUserDto } from '../dto/login_user.dto';
import { User } from '../user.entity';

@Controller('users')
  export class UserController {
    constructor(
      private userService: UserService,
      private authService: AuthService,
    ) {}

    @Post('auth/sign-up')
    @UsePipes(ValidationPipe)
    async create(@Body() createUserDto: CreateUserDto) {
      return this.userService.create(createUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(): Promise<CreateUserDto[]> {      
      return this.userService.findAll();
    }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Body() body: LoginUserDto, @Request() req) {
      return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/me')
    me(@Request() req) : Promise<LoginUserDto> {
      return req.user;
    }
    
    @Get(':id')
    getById(@Param('id') id: string): Promise<User> {
    return this.userService.getById(id)
  }
}

  export interface ValidationPipeOptions extends ValidatorOptions {
    transform?: boolean;
    disableErrorMessages?: boolean;
    exceptionFactory?: (errors: ValidationError[]) => any;
  }
