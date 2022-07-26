import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';

@Controller({ version: VERSION_NEUTRAL })
export class NeutralController {
  @Get()
  healthCheck(): string {
    return 'ok';
  }
}
