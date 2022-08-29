import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../users/users.service';
import { WsException } from '@nestjs/websockets';
import { gameEvents } from '../game/constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRole = this.reflector.get<string>(
      'role',
      context.getHandler(),
    );
    if (!requiredRole) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId;
    const userRole = request.user.role

    return userId && userRole === requiredRole;
  }
}

@Injectable()
export class WsRolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRole = this.reflector.get<string>(
      'role',
      context.getHandler(),
    );
    if (!requiredRole) {
      return true;
    }
    const client = context.switchToWs().getClient();
    const userId = client?.user?.userId;
    // const userRole = await this.usersService.getRoleById(userId);
    const userRole = client?.user?.role;

    console.log(
      userId && userRole === requiredRole,
      userId,
      userRole,
      requiredRole,
    );
    if (!userId || userRole !== requiredRole) {
      // const newWsException = new WsException('Forbidden resource');
      // console.log(newWsException);
      // throw new WsException('Forbidden resource');
      // // console.log(context.switchToWs().getClient().id)
      client.emit(gameEvents.messageToChat, 'Forbidden resource');
      client.disconnect();
    }
    return userId && userRole === requiredRole;
  }
}
