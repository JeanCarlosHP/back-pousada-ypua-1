import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ShowUsuarioDTO } from "./dto/ShowUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { Repository } from "typeorm";
import { UpdateUsuarioDTO } from "./dto/UpdateUsuario.dto";

@Injectable()
export class UsuarioService{
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
    ) {}

    async createUsuario(usuarioEntity: UsuarioEntity){
        await this.usuarioRepository.save(usuarioEntity);
    }

    async readUsuario(){
        const usuariosSalvos = await this.usuarioRepository.find();
        const usuariosLista=usuariosSalvos.map(
            (usuario)=> new ShowUsuarioDTO(usuario.id,usuario.nome,usuario.email,usuario.rg,usuario.cpf,usuario.role)
        )

        return usuariosLista;
    }

    async updateUsuario(id:string, usuarioEntity:UpdateUsuarioDTO){
        await this.usuarioRepository.update(id,usuarioEntity);

    }

    async deleteUsuario(id:string){
        try {
            await this.usuarioRepository.delete(id);
        } catch (error) {
            if (error instanceof Error && error.message.includes('violates foreign key constraint')) {
                throw new Error('Não é possível excluir o usuário pois ele tem reservas.');
            }
            throw error;
        }
    }

    async buscaPorEmail(email:string){
        const usuarioEncontrado=await this.usuarioRepository.findOne({
            where:{
                email
            }
        })

        if(!usuarioEncontrado){
            throw new Error('Usuario não encontrado');
        }

        return usuarioEncontrado;
    }

    async findUserById(id:string){
        const usuarioEncontrado = await this.usuarioRepository.findOneBy({ id });

        if(!usuarioEncontrado){
            throw new Error('Usuario não encontrado');
        }

        return usuarioEncontrado;
    }
    
}