import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { StatusReserva } from '../reserva/enum/StatusReserva.enum';
import { ReservaEntity } from 'src/reserva/reserva.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CheckinService {
  constructor(
    @InjectRepository(ReservaEntity)
    private readonly reservaRepository: Repository<ReservaEntity>
  ) {}

  async realizarCheckin(codigo: string): Promise<string> {
    try {
      const reserva = await this.reservaRepository.findOneBy({ codigo });
      
      if (!reserva) {
        throw new NotFoundException('Reserva não encontrada.');
      }

      const hoje = new Date().toISOString().split('T')[0];

      if (reserva.dataEntrada != hoje) {
        throw new BadRequestException('A data do check-in é inválida.');
      }

      reserva.status = StatusReserva.EM_PROCESSAMENTO;
      await this.reservaRepository.save(reserva);

      return 'Check-in realizado com sucesso.';
    } catch (error) {
      throw new BadRequestException(
        `Erro ao realizar check-in: ${error.message || 'Erro desconhecido.'}`,
      );
    }
  }
}
