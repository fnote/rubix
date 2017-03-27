import { ConfigService } from '../config/config.service';
import { Injectable } from '@angular/core';
import { LogLevels } from '../constants/enums/log-levels.enum';

@Injectable()
export class LoggerService {

	private loggerUrl = 'logger';
	private lastSentIndex = 0;
	private isRequestInProgress = false;
	private isPeriodicUpdateStarted = false;
	private configObj: Object = {};

	constructor(private configService: ConfigService) { }

	public logError (logEntry: string): void {
		this.amendLog(logEntry, LogLevels.LogError);
	}

	public logWarning (logEntry: string): void {
		this.amendLog(logEntry, LogLevels.LogWarning);
	}

	public logInfo (logEntry: string): void {
		this.amendLog(logEntry, LogLevels.LogInfo);
	}

	public logDebug (logEntry: string): void {
		this.amendLog(logEntry, LogLevels.LogDebug);
	}

	public LogData (logEntry: string): void {
		this.amendLog(logEntry, LogLevels.LogData);
	}

	private amendLog (logEntry: string, logType: LogLevels): void {
		try {
			if (this.configService.getNumberConfigVal('loggerConfig', 'appLogLevel') >= logType) {
				this.amendLogConsole(logEntry, logType);
			}

			if (this.configService.getNumberConfigVal('loggerConfig', 'serverLogLevel') >= logType) {
				this.amendLogToBuffer(logEntry, logType);
			}
		} catch (e) {
			console.error((['Logger error: ', e].join('')));
		}
	}

	private amendLogConsole (logEntry: string, logType: LogLevels): void {
		switch (logType) {
			case LogLevels.LogError:
				console.error(logEntry);
				break;

			case LogLevels.LogWarning:
				console.warn(logEntry);
				break;

			case LogLevels.LogInfo:
				/* tslint:disable */
				console.info(logEntry);
				/* tslint:enable */
				break;

			default:
				console.log(logEntry);
				break;
		}
	}

	private amendLogToBuffer (logEntry: string, logType: LogLevels): void {
		// TODO: [Amila] Check the necessity of sending server side logs and implement this
	}
}
