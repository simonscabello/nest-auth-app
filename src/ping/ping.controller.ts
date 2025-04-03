import { Controller, Get } from '@nestjs/common';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

@Controller('ping')
export class PingController {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  @Get()
  async checkConnection() {
    return {
      readyState: this.connection.readyState, // 1 = conectado
      message: this.connection.readyState === 1 ? 'MongoDB conectado!' : 'Sem conexão com MongoDB',
    };
  }
}
