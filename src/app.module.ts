import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppLoggerModule } from './app-logger/app-logger.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { CompaniesModule } from './companies/companies.module';

const throttlerModule = ThrottlerModule.forRoot([
  {
    name: 'short',
    ttl: 1000,
    limit: 1,
  },
  {
    name: 'long',
    ttl: 10000,
    limit: 5,
  },
]);

const throttleProvider = {
  provide: APP_GUARD,
  useClass: ThrottlerGuard,
};

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    EmployeesModule,
    throttlerModule,
    AppLoggerModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    CompaniesModule,
  ],
  controllers: [AppController],
  providers: [AppService, throttleProvider],
})
export class AppModule {}
