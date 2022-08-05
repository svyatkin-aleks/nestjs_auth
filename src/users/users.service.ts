import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterPlayerDto } from './dto/register-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async registerPlayer(RegisterPlayerDto: RegisterPlayerDto): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const bcrypt = require('bcrypt');
    const newPlayer = new this.userModel(RegisterPlayerDto);
    const hashed_password = await bcrypt.hash(newPlayer.password, 10);
    newPlayer.password = hashed_password;
    return await newPlayer.save();
  }

  async getPlayers(): Promise<User[]> {
    const players = await this.userModel.find().select('-password');
    return players;
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email: email });
  }

  async findById(userId: string): Promise<User | undefined> {
    return this.userModel.findById(userId);
  }

  async getRoleById(userId: string): Promise<string | null> {
    const { role, ...result } = await this.userModel.findById(userId);
    return role;
  }
}
