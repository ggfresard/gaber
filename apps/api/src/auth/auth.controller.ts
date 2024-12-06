import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @Get('github')
  @UseGuards(AuthGuard('github'))
  githubLogin() {
    // GitHub login initiated
    return { msg: 'Redirecting to GitHub...' }
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  githubCallback(@Req() req, @Res() res: Response) {
    const user = req.user

    const data = {
      githubId: user.githubId,
      name: user.name,
      email: user.email,
    }
    const token = this.jwtService.sign(data)

    // Redirect with token
    const frontendUrl = `http://localhost:3001/auth/callback?token=${token}`
    return res.redirect(frontendUrl)
  }
}
