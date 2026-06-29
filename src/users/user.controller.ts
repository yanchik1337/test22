import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegUserDto } from './dto/registrationUser.dto';
import { AuthGuard } from '../guards/auth.guard';
import { LogUserDto } from './dto/loginUser.dto';
import { User } from '../decorators/user.decorator';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('registration')
  registration(@Body() body: RegUserDto) {
    return this.userService.registration(body);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() body: LogUserDto) {
    return this.userService.login(body);
  }

  @Get('auth')
  @UseGuards(AuthGuard)
  check(@User() user: any) {
    return this.userService.check(user);
  }
}
