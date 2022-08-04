// import {
//   Injectable,
//   NestMiddleware,
//   HttpStatus,
//   createParamDecorator,
//   ExecutionContext,
// } from '@nestjs/common';
// import { HttpException } from '@nestjs/common/exceptions/http.exception';
// import { NextFunction, Request, Response } from 'express';
// import { JwtService } from '@nestjs/jwt';
//
// @Injectable()
// export class AuthMiddleware implements NestMiddleware {
//   constructor(private jwtService: JwtService) {}
//   async use(req: Request, _: Response, next: NextFunction) {
//     console.log('sdfsdfds')
//     const { authorization } = req.headers;
//     if (!authorization) {
//       req['user'] = null;
//       next();
//     }
//       const token = req.headers.authorization.split(' ')[1];
//       console.log(this.jwtService.decode(token, { json: true }));
//   }
// }
