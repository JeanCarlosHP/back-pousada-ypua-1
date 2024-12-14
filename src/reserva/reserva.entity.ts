import { Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import { StatusReserva } from './enum/StatusReserva.enum';
import { HospedeEntity } from '../hospede/hospede.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { AcomodacaoEntity } from '../acomodacao/acomodacao.entity';

@Entity({name: 'reservas'})
export class ReservaEntity{
    
    @PrimaryGeneratedColumn('uuid')
    id:string;
    
    @Column({name:'codigo', length:100, nullable:false})
    codigo:string;
    
    @Column({name:'status', enum:StatusReserva, nullable:false})
    status:StatusReserva;
    
    @Column({name:'data_entrada', length:30, nullable:false})
    dataEntrada:string;
    
    @Column({name:'data_saida', length:30, nullable:false})
    dataSaida:string;
    
    @Column({name:'valor_total', type:`float`, nullable:false})
    valorTotal:number;

    @CreateDateColumn({name:'created_at'})
    createdAt:string;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt:string;

    @DeleteDateColumn({name: 'deleted_at'})
    deletedAt:string;

    @Column({name:'usuarioId', nullable:false})
    usuarioId:string;

    @ManyToOne(()=>UsuarioEntity, (usuario)=>usuario.reservas)
    usuario:UsuarioEntity

    @ManyToOne(() => AcomodacaoEntity, acomodacao => acomodacao.reservas)
    acomodacao: AcomodacaoEntity;

    @OneToMany(() => HospedeEntity, hospedagem => hospedagem.reserva)
    hospedes: HospedeEntity[];
}