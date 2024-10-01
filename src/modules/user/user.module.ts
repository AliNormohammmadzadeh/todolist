import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { UserController } from './presentation/user.controller';
import { UserSchema } from './infrastructure/schemas/user.schema';
import { CreateUserHandler } from './application/handler/create-user.handler';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: 'your_jwt_secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController],
  providers: [
    CreateUserHandler,
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
  ],
  exports: [
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}