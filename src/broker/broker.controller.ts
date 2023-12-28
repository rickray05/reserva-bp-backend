import { Controller, Get, Header, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from '../user/user.service';

@ApiTags('Consultores')
@UseGuards(JwtAuthGuard)
@Controller('broker')
export class BrokerController {
  constructor(private userService: UserService) {}
  @ApiOperation({ summary: 'Listar Consultores' })
  @Header('Content-Type', 'application/json')
  @Get()
  async listBrokers() {
    return await this.userService.findBrokers();
  }
}
