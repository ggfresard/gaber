import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOrCreate(userDetails: Partial<User>): Promise<User> {
    let user = await this.usersRepository.findOneBy({
      githubId: userDetails.githubId,
    })

    if (!user) {
      user = this.usersRepository.create(userDetails)
      await this.usersRepository.save(user)
    }

    return user
  }
}
