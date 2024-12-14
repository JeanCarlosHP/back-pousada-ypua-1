import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { StatusReserva } from '../reserva/enum/StatusReserva.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservaEntity } from 'src/reserva/reserva.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CheckoutService {
  constructor(
    @InjectRepository(ReservaEntity)
    private readonly reservaRepository: Repository<ReservaEntity>
  ) {}

  async realizarCheckout(codigo: string): Promise<string> {
    try {
      const reserva = await this.reservaRepository.findOneBy({ codigo });
      if (!reserva) {
        throw new NotFoundException('Reserva n�o encontrada.');
      }

      console.log(codigo)
      console.log(reserva)

      if (reserva.status === StatusReserva.EM_PROCESSAMENTO) {
        reserva.status = StatusReserva.CONCLUIDO;
        await this.reservaRepository.save(reserva);
        return 'Check-out realizado com sucesso.';
      }

      throw new BadRequestException('Check-in n�o realizado para esta reserva.');
    } catch (error) {
      throw new BadRequestException(
        `Erro ao realizar check-out: ${error.message || 'Erro desconhecido.'}`,
      );
    }
  }
}
