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

	public logError (logEntry: string, module: string, logEvent?: any): void {
		this.amendLog(logEntry, LogLevels.LogError, module, logEvent);
	}

	public logWarning (logEntry: string, module: string, logEvent?: any): void {
		this.amendLog(logEntry, LogLevels.LogWarning, module, logEvent);
	}

	public logInfo (logEntry: string, module: string, logEvent?: any): void {
		this.amendLog(logEntry, LogLevels.LogInfo, module, logEvent);
	}

	public logDebug (logEntry: string, module: string, logEvent?: any): void {
		this.amendLog(logEntry, LogLevels.LogDebug, module, logEvent);
	}

	public LogData (logEntry: string, module: string, logEvent?: any): void {
		this.amendLog(logEntry, LogLevels.LogData, module, logEvent);
	}

	private amendLog (logEntry: string, logType: LogLevels, module: string, logEvent?: Object): void {
		const logStr = module ? ['[', module, '] ', logEntry].join('') : logEntry;

		try {
			if (this.systemLogLevel >= logType) {
				this.amendLogConsole(logStr, logType, logEvent);
			}

			if (this.serverLogLevel >= logType) {
				this.amendLogToBuffer(logStr, logType);
			}
		} catch (e) {
			this.amendLogConsole(['Logger error: ', e].join(''), e, LogLevels.LogError);
		}
	}

	private amendLogConsole (logEntry: string, logType: LogLevels, logEvent: Object = ''): void {
		/* tslint:disable */
		switch (logType) {
			case LogLevels.LogError:
				console.error(logEntry, logEvent);
				break;

			case LogLevels.LogWarning:
				console.warn(logEntry, logEvent);
				break;

			case LogLevels.LogInfo:
				console.info(logEntry, logEvent);
				break;

			default:
				console.log(logEntry, logEvent);
				break;
		}
		/* tslint:enable */
	}

	private amendLogToBuffer (logEntry: string, logType: LogLevels): void {
		// TODO: [Amila] Check the necessity of sending server side logs and implement this
	}
}
