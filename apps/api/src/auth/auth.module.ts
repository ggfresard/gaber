import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { GithubStrategy } from './github.strategy'
import { AuthController } from './auth.controller'
import { UsersModule } from '../users/users.module'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    PassportModule,
    UsersModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [GithubStrategy],
})
export class AuthModule {}
