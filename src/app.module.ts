import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [], 
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');
        Logger.log(`MongoDB URI: ${uri}`, 'AppModule');
        return { uri };
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
