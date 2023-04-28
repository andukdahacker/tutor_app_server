import { Module } from '@nestjs/common';
import { ConnectionResolver } from './connection.resolver';
import { ConnectionService } from './connection.service';

@Module({
  providers: [ConnectionResolver, ConnectionService],
})
export class ConnectionModule {}
