import { InterceptingCall } from '@grpc/grpc-js';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HERO_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'hero',
          protoPath: join(__dirname, 'hero.proto'),
          interceptors: [
            /**
             * This interceptor never gets called.
             */
            (options, nextCall) => {
              console.log('CALLED INTERCEPTOR');
              throw new Error(`This won't be thrown.`);
              return new InterceptingCall(nextCall(options));
            },
          ],

          /**
           * This is working.
           * Commented out so as to not interfere with above.
           */
          // channelOptions: {
          //   interceptors: [
          //     (options, nextCall) => {
          //       console.log('CALLED CHANNEL OPTIONS INTERCEPTOR');
          //       return new InterceptingCall(nextCall(options));
          //     },
          //   ] as any,
          // },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
