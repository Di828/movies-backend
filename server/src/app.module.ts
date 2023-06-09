import { Module } from '@nestjs/common';
import { FilmController } from './film.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MineController } from './mine.controller';
import { PersonController } from './person.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { GenresController } from './genre.controller';
import { CountryController } from './country.controller';
import { ReviewController } from './review.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'FILM_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
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
          urls: ['amqp://rabbitmq:5672'],
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
  controllers: [FilmController, MineController, PersonController, AuthController, GenresController, CountryController, ReviewController],
  providers: [],
})
export class AppModule {}
