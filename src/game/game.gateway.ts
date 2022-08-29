import {
  Logger,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { gameEvents } from './constants';
import { HasRole } from '../auth/has-roles.decorator';
import { Roles } from '../auth/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import {RolesGuard, WsRolesGuard} from '../auth/roles.guard';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  // path: '/chat',
  namespace: '/game_events',
})
export class GameEventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private jwtService: JwtService) {}
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client to chat connected ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`Client to chat disconnected: ${client.id}`);
  }
  private logger: Logger = new Logger('GameGateway');

  private readonly room = 'gameEvents';

  @WebSocketServer() wss: Server;

  async afterInit(server: Server) {
    this.logger.log('Initialized');
  }

  @HasRole(Roles.Dealer)
  @UseGuards(AuthGuard('jwt'), WsRolesGuard)
  @SubscribeMessage(gameEvents.gameStarted)
  handleJoinDealerRoom(
    client: Socket,
    payload: { sender: string; message: string },
  ): void {
    // const headers = client.handshake.headers;
    // const token = headers.authorization.replace('Bearer ', '');
    // const tokenPayload = this.jwtService.decode(token);
    // if (tokenPayload['role'] !== Roles.Dealer) {
    //   client.disconnect(true);
    // }
    client.join(this.room);
    this.wss.to(this.room).emit(gameEvents.gameStarted, 'STARTED');
    this.wss.to(this.room).emit(gameEvents.redWin, 'red won');
  }

  @SubscribeMessage(gameEvents.playerConnected)
  handleJoinPlayerRoom(
    client: Socket,
    payload: { sender: string; message: string },
  ): void {
    client.join(this.room);
    // client.emit(gameEvents.redWin, 'Connected');
    // client.emit(gameEvents.gameStarted);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string): void {
    client.leave(room);
    client.emit('leftRoom', room);
  }

  @SubscribeMessage('messageToClient')
  handleMessageToClient(client: Socket, room: string): void {
    client.leave(room);
    client.emit('leftRoom', room);
  }
}
