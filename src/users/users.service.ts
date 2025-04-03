// users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(dto: CreateUserDto): Promise<User> {
    const hashed = await bcrypt.hash(dto.password, 10);
    const createdUser = new this.userModel({ ...dto, password: hashed });
    return createdUser.save();
  }

  async findByEmail(email: string): Promise<any> {
    return this.userModel.findOne({ email }).lean();
  }  

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
