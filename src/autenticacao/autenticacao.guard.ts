import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UsuarioPayload } from './autenticacao.service';

export interface RequiscaocomUsuario extends Request {
  usuario: UsuarioPayload;
}


@Injectable()
export class AutenticacaoGuard implements CanActivate {
  constructor (private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequiscaocomUsuario>();
    const token = this.extrairTokenDoCabecalho(request);
    const route = request.route.path;
    const method = request.route.stack[0].method;

    if (route === '/usuario' && method === 'post') {
      return true;
    }

    if (route === '/acomodacao' && method === 'get') {
      return true;
    }

    if (!token) {
      throw new UnauthorizedException('Erro de autenticação');
    }

    try {
      const payload:UsuarioPayload = await this.jwtService.verifyAsync(token)
      request.usuario = payload;
    } catch {
      throw new UnauthorizedException('JWT inválido');
    }
    return true;
  }

  private extrairTokenDoCabecalho(requisicao: Request): string | undefined {
    // Formato do cabeçalho authorization: "Bearer <valor_do_jwt>" -> protocolo HTTP
    const [tipo, token] = requisicao.headers.authorization?.split(' ') ?? [];
    return tipo === 'Bearer' ? token : undefined;
  }
}
