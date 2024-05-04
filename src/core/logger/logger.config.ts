import { ConfigModule, ConfigService } from '@nestjs/config';
import { IncomingMessage } from 'http';
import { LoggerModule } from 'nestjs-pino';
import { v4 as uuidv4 } from 'uuid';

const customReceivedMessage = (req: IncomingMessage) => {
  const { method, url } = req;
  return `[Request] ${method} ${url}`;
};

const customSuccessMessage = (
  req: IncomingMessage,
  res: any,
  responseTime: number,
) => {
  const { method, url } = req;
  const { statusCode } = res;
  return `[Response] ${method} ${url} - ${statusCode} in ${responseTime}ms`;
};

export const LoggerConfig = LoggerModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    // We can do some await here
    return {
      pinoHttp: {
        level: configService.get('LOG_LEVEL', 'debug'),
        autoLogging: true,
        base: null,
        quietReqLogger: true,
        genReqId: (request) => request.headers['x-correlation-id'] || uuidv4(),
        messageKey: 'message',
        customReceivedMessage,
        customSuccessMessage,
        transport:
          process.env.NODE_ENV !== 'production' &&
          configService.get('LOG_TARGET', 'CONSOLE') === 'CONSOLE'
            ? {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  ignore:
                    'reqId,req.headers,req.remoteAddress,req.remotePort,pid,hostname,res.headers',
                  messageKey: 'message',
                },
              }
            : undefined,
      },
    };
  },
});
