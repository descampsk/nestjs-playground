import type { RedisClientOptions } from 'redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule, type CacheModuleOptions } from '@nestjs/cache-manager';
import KeyvRedis from '@keyv/redis';

const getCacheModuleConfig = (
  configService: ConfigService,
): CacheModuleOptions<RedisClientOptions> => {
  if (configService.get<string>('REDIS_ENABLED', 'false') === 'true')
    return {
      isGlobal: true,
      stores: [
        new KeyvRedis(
          configService.get<string>('REDIS_URL', 'redis://localhost:6379'),
        ),
      ],
    };

  return {
    isGlobal: true,
  };
};

export const CacheModuleRegistered = CacheModule.registerAsync({
  imports: [ConfigModule],
  useFactory: getCacheModuleConfig,
  inject: [ConfigService],
});
