import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(body: any): Promise<any> {
    let user: any;
    const hashed = await bcrypt.hash(body.password, 10);
    const newuser = new this.userModel({
      name: body.name,
      email: body.email,
      password: hashed,
      phonenumber: body.phonenumber,
    });
    try {
      user = await newuser.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    if (!user) {
      throw new ConflictException('User not created');
    }
    console.log('Created User:', user);
    return {
      user,
      msg: 'success',
    };
  }
  async getByEmail(email: string): Promise<any> {
    const result = await this.userModel.findOne({ where: { email: email } });
    return result;
  }

  async findOne(id: number): Promise<User> {
    return this.userModel.findOne({ where: { id: id } });
  }
  async findAll() {
    const users = await this.userModel.findAll({
      order: [['id', 'DESC']],
    });
    return users;
  }
}
