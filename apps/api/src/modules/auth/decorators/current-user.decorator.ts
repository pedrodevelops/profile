import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '@api/modules/user/user.entity';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): Omit<UserEntity, 'password'> => {
    const request = context.switchToHttp().getRequest();

    return request.user;
  },
);
