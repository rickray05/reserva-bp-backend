import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUserLoggedId = createParamDecorator(
  (data: unknown, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
