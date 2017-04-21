import { ConfigService } from '../config/config.service';
import { Injectable } from '@angular/core';
import { LogLevels } from '../constants/enums/log-levels.enum';

@Injectable()
export class LoggerService {

	private loggerUrl = 'logger';
	private lastSentIndex = 0;
	private isRequestInProgress = false;
	private isPeriodicUpdateStarted = false;

	constructor(private configService: ConfigService) { }

	public logError (logEntry: string, module?: string): void {
		this.amendLog(logEntry, LogLevels.LogError, module);
	}

	public logWarning (logEntry: string, module?: string): void {
		this.amendLog(logEntry, LogLevels.LogWarning, module);
	}

	public logInfo (logEntry: string, module?: string): void {
		this.amendLog(logEntry, LogLevels.LogInfo, module);
	}

	public logDebug (logEntry: string, module?: string): void {
		this.amendLog(logEntry, LogLevels.LogDebug, module);
	}

	public LogData (logEntry: string, module?: string): void {
		this.amendLog(logEntry, LogLevels.LogData, module);
	}

	private amendLog (logEntry: string, logType: LogLevels, module?: string): void {
		const logStr = module ? ['[', module, '] ', logEntry].join('') : logEntry;

		try {
			this.configService.getNumberConfigVal('loggerConfig', 'appLogLevel').then(logLevel => {
				if (logLevel >= logType) {
					this.amendLogConsole(logStr, logType);
				}
			});
			this.configService.getNumberConfigVal('loggerConfig', 'serverLogLevel').then(logLevel => {
				if (logLevel >= logType) {
					this.amendLogToBuffer(logStr, logType);
				}
			});
		} catch (e) {
			this.amendLogConsole(['Logger error: ', e].join(''), LogLevels.LogError);
		}
	}

	private amendLogConsole (logEntry: string, logType: LogLevels): void {
		/* tslint:disable */
		switch (logType) {
			case LogLevels.LogError:
				console.error(logEntry);
				break;

			case LogLevels.LogWarning:
				console.warn(logEntry);
				break;

			case LogLevels.LogInfo:
				console.info(logEntry);
				break;

			default:
				console.log(logEntry);
				break;
		}
		/* tslint:enable */
	}

	private amendLogToBuffer (logEntry: string, logType: LogLevels): void {
		// TODO: [Amila] Check the necessity of sending server side logs and implement this
	}
}
