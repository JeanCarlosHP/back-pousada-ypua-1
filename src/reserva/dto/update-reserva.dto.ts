import { IsEnum, IsOptional } from 'class-validator';
import { StatusReserva } from '../enum/StatusReserva.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReservaDTO {

    @ApiProperty({
        type: String,
        description: 'Código da reserva',
        example: '12345678',
        required: false,
    })
    @IsOptional()
    codigo: string;

    @ApiProperty({
        type: String,
        description: 'Id do usuário',
        example: '12345678',
        required: false,
    })
    @IsOptional()
    usuarioId: string;

    @ApiProperty({
        type: String,
        description: 'Data de entrada',
        example: '2021-09-01',
        required: false,
    })
    @IsOptional()
    dataEntrada: string;

    @ApiProperty({
        type: String,
        description: 'Data de saída',
        example: '2021-09-05',
        required: false,
    })
    @IsOptional()
    dataSaida: string;

    @ApiProperty({
        type: Number,
        description: 'Status da reserva',
        example: 'RESERVADO',
        required: false,
    })
    @IsOptional()
    @IsEnum(StatusReserva)
    status: StatusReserva;

    @ApiProperty({
        type: Number,
        description: 'Valor total',
        example: 1000,
        required: false,
    })
    @IsOptional()
    valorTotal: number;
}
