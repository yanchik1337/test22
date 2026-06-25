import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegUserDto } from './dto/registrationUser.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Basket } from '../basket/basket.entity';
import { LogUserDto } from './dto/loginUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Basket)
    private readonly basketRepository: Repository<Basket>,
    private readonly jwtService: JwtService,
  ) {}

  generateJwt = (id: number, email: string, role: 'USER' | 'ADMIN') => {
    return this.jwtService.sign({ id, email, role });
  };
  async registration(body: RegUserDto) {
    const { email, role, password } = body;
    const candidate = await this.userRepository.findOneBy({ email });
    if (candidate) {
      throw new BadRequestException(
        'Пользователь с таким email уже существует',
      );
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await this.userRepository.save({
      email,
      role,
      password: hashPassword,
    });
    const basket = await this.basketRepository.save({
      user: { id: user.id } as User,
    });
    const token = this.generateJwt(user.id, user.email, user.role);
    return { token };
  }
  async login(body: LogUserDto) {
    const { email, password } = body;
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new BadRequestException('Неверный логин или пароль');
    }
    let comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }
    const token = this.generateJwt(user.id, user.email, user.role);
    return { token };
  }

  async check(user: { id: number; email: string; role: 'USER' | 'ADMIN' }) {
    const token = this.generateJwt(user.id, user.email, user.role);
    return { token };
  }
}
