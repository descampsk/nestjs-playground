import { CacheModule, CacheModuleOptions, CacheStore } from '@nestjs/common';
import type { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';

const getCacheModuleConfig = async (
  configService: ConfigService,
): Promise<CacheModuleOptions<RedisClientOptions>> => {
  if (configService.get<string>('REDIS_ENABLED', 'false') === 'true')
    return {
      isGlobal: true,
      store: redisStore as unknown as CacheStore,
      url: configService.get<string>('REDIS_URL', 'redis://localhost:6379'),
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
