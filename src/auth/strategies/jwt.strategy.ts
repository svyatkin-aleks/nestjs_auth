import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    function fromAuthHeader() {
      return function (request) {
        let token = null;
        // console.log(request.handshake.headers.authorization);
        if (request.handshake) {
          token = request.handshake.headers.authorization.replace(
            'Bearer ',
            '',
          );
          return token;
        }
        if (request.headers) {
          token = request.headers.authorization.replace('Bearer ', '');
          // token = ExtractJwt.fromAuthHeaderAsBearerToken();
          console.log(token);
          // return token
        }
        // console.log(token);
        return token;
      };
    }

    super({
      jwtFromRequest: fromAuthHeader(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    console.log(payload)
    return {
      userId: payload.sub,
      username: payload.username,
      role: payload.role,
    };
  }

  getRequest(context) {
    return context.switchToWs().getClient();
  }
}
