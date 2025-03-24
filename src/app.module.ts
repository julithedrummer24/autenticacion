import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@module({
    imports: [AuthModule, UserModule],
})
export class AppModule {}|