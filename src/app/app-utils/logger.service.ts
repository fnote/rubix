import { Injectable } from '@angular/core';
import { LogLevels } from '../app-constants/enums/log-levels.enum';
import { environment } from '../../environments/environment';

@Injectable()
export class LoggerService {

	private loggerUrl = 'logger';
	private lastSentIndex = 0;
	private isRequestInProgress = false;
	private isPeriodicUpdateStarted = false;
	private systemLogLevel = environment.appLogLevel;
	private serverLogLevel = environment.serverLogLevel;

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
			if (this.systemLogLevel >= logType) {
				this.amendLogConsole(logStr, logType);
			}

			if (this.serverLogLevel >= logType) {
				this.amendLogToBuffer(logStr, logType);
			}
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
