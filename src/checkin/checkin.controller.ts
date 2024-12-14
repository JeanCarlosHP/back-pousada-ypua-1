import { Controller, Post, Param, Query } from '@nestjs/common';
import { CheckinService } from './checkin.service';

@Controller('/checkin')
export class CheckinController {
  constructor(private readonly checkinService: CheckinService) {}

  @Post()
  async realizarCheckin(@Query('codigo') codigo?: string) {
    return await this.checkinService.realizarCheckin(codigo);
  }
}
