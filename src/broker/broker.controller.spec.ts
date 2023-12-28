import { Test, TestingModule } from '@nestjs/testing';
import { BrokerController } from './broker.controller';

describe('BrokerController', () => {
  let controller: BrokerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrokerController],
    }).compile();

    controller = module.get<BrokerController>(BrokerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
