import { Controller, Post, Query } from '@nestjs/common';
import { CheckoutService } from './checkout.service';

@Controller('/checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  async realizarCheckout(@Query('codigo') codigo?: string) {
    return await this.checkoutService.realizarCheckout(codigo);
  }
}
