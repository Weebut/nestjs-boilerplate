import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller({ version: VERSION_NEUTRAL })
export class NeutralController {
  @Get()
  @Public()
  healthCheck(): string {
    return 'ok';
  }
}
