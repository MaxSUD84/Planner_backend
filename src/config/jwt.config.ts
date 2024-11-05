import { JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

/**
 * Returns the configuration for the JwtModule based on values from the .env file.
 *
 * @param configService - The ConfigService to use to get the values from the .env file.
 * @returns A Promise that resolves to the JwtModuleOptions configuration.
 */

export const getJwtConfig = async (
  configService: ConfigService,
): Promise<JwtModuleOptions> => ({
  secret: configService.get('JWT_SECRET'),
  signOptions: { expiresIn: configService.get('JWT_EXPIRATION') },
});
