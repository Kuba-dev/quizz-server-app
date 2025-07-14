import { NestFactory, Reflector } from '@nestjs/core'
import { AuthModule } from './auth.module'
import { AuthGuard } from './guards/auth.guard'
import { JwtService } from '@nestjs/jwt'

async function bootstrap() {
  const app = await NestFactory.create(AuthModule)
  const reflector = app.get(Reflector)
  const jwtService = app.get(JwtService)
  app.useGlobalGuards(new AuthGuard(jwtService, reflector))

  await app.listen(process.env.port ?? 3001)
}
bootstrap().catch(err => {
  console.error('Error when starting the application:', err)
})
