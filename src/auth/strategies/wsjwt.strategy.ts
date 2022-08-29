// // import { ExtractJwt, Strategy } from 'passport-jwt';
// // import { PassportStrategy } from '@nestjs/passport';
// // import { Injectable } from '@nestjs/common';
// // import { jwtConstants } from '../constants';
// //
// // @Injectable()
// // export class WsjwtStrategy extends PassportStrategy(Strategy) {
// //   constructor() {
// //     function fromAuthHeader() {
// //       return function (request) {
// //         let token = null;
// //         // console.log(request.handshake.headers.authorization);
// //         if (request.handshake.headers.authorization) {
// //           token = request.handshake.headers.authorization.replace(
// //             'Bearer ',
// //             '',
// //           );
// //         }
// //         // console.log(token);
// //         return token;
// //       };
// //     }
// //
// //     super({
// //       jwtFromRequest: fromAuthHeader(),
// //       ignoreExpiration: false,
// //       secretOrKey: jwtConstants.secret,
// //     });
// //   }
// //
// //   async validate(payload: any) {
// //     return {
// //       userId: payload.sub,
// //       username: payload.username,
// //       role: payload.role,
// //     };
// //   }
// //
// //   getRequest(context) {
// //     return context.switchToWs().getClient();
// //   }
// // }
//
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { AuthGuard } from '@nestjs/passport';
// import { Injectable } from '@nestjs/common';
// import { jwtConstants } from '../constants';
//
// @Injectable()
// export class WsJwtStrategy extends AuthGuard('jwt') {
//   constructor() {
//     function fromAuthHeader() {
//       return function (request) {
//         let token = null;
//         // console.log(request.handshake.headers.authorization);
//         if (request.handshake.headers.authorization) {
//           token = request.handshake.headers.authorization.replace(
//             'Bearer ',
//             '',
//           );
//         }
//         // console.log(token);
//         return token;
//       };
//     }
//
//     super({
//       jwtFromRequest: fromAuthHeader(),
//       ignoreExpiration: false,
//       secretOrKey: jwtConstants.secret,
//     });
//   }
//
//   async validate(payload: any) {
//     console.log(payload);
//     return {
//       userId: payload.sub,
//       username: payload.username,
//       role: payload.role,
//     };
//   }
// }
