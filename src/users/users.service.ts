import { Injectable, NotFoundException } from '@nestjs/common';
import {User, UserDocument} from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpDto } from '../auth/dto/sign-up.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  create(signUpDto: SignUpDto): Promise<UserDocument> {
    return this.userModel.create(signUpDto);
  }

  async findById(id: string): Promise<UserDocument> {
    const user: UserDocument | undefined = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  findByEmail(email: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({ email });
  }
}
