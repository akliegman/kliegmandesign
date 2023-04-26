import { createLogger, transports, format, addColors, Logger } from "winston";

export const logger: Logger = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize({ all: true }),
        format.timestamp({ format: "YY-MM-DD HH:mm:ss" }),
        format.json(),
        format.prettyPrint(),
        format.printf(({ timestamp, level, message }) => {
          const levelCapitalized =
            level.charAt(0).toUpperCase() + level.slice(1);
          return `[${timestamp}] ${levelCapitalized}: ${message}`;
        })
      ),
    }),
  ],
});

addColors({
  info: "bold cyan",
  warn: "italic yellow",
  error: "bold red",
  debug: "green",
});
