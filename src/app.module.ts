import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Catch } from './catches/entities/catch.entity';
import { Profile } from './profiles/entities/profile.entity';
import { Location } from './locations/entities/location.entity';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { CatchesModule } from './catches/catches.module';
import { LocationsModule } from './locations/locations.module';
import Token from './users/auth/token.entity';
import { AuthController } from './users/auth/auth.controller';
import { AuthService } from './users/auth/auth.service';
import TokenStrategy from './users/auth/token.strategy';
import { CatchesController } from './catches/catches.controller';
import { CatchesService } from './catches/catches.service';
import { CalendarModule } from './calendar/calendar.module';
import { Calendar } from './calendar/entities/calendar.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'fishing',
      entities: [User, Profile, Catch, Location, Token, Calendar],
      synchronize: true,
    }),
    UsersModule,
    ProfilesModule,
    CatchesModule,
    LocationsModule,
    CalendarModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, TokenStrategy],
})
export class AppModule {}
