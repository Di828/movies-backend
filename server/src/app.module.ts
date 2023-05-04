import { Module } from '@nestjs/common';
import { FilmController } from './film.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MineController } from './mine.controller';
import { PersonController } from './person.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'FILM_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'film_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {        
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'auth_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
    JwtModule.register({
      secret : 'Secret',
      signOptions : {
        expiresIn : '24h'
      }
    }),
  ],
  controllers: [FilmController, MineController, PersonController],
  providers: [],
})
export class AppModule {}
