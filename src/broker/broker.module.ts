import { Module } from '@nestjs/common';
import { BrokerService } from './broker.service';
import { BrokerController } from './broker.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [BrokerService],
  controllers: [BrokerController]
})
export class BrokerModule {}
