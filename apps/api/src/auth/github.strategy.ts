import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-github2'
import { UsersService } from '../users/users.service'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
  ) {
    const clientID = configService.get('GITHUB_CLIENT_ID')
    const clientSecret = configService.get('GITHUB_CLIENT_SECRET')
    const callbackURL = configService.get('GITHUB_CALLBACK_URL')
    super({
      clientID,
      clientSecret,
      callbackURL,
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const { id, displayName, emails } = profile
    return this.usersService.findOrCreate({
      githubId: id,
      name: displayName,
      email: emails[0]?.value || null,
    })
  }
}
