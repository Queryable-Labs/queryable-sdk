import {
    LogLevel,
    UInt8Value,
    StringValue,
    StructValue,
    Value,
    NullValue
} from "../types";

// @ts-ignore: decorator
@external("log", "log")
declare function try_log(level: UInt8Value, message: StringValue, extra: Value): void;

export namespace Log {
    function log(level: LogLevel, message: string, context: StructValue | null): void {
        let value: Value;

        if (context == null) {
            value = new NullValue();
        } else {
            value = context;
        }

        const levelValue = new UInt8Value(false);
        levelValue.value = level as u8;

        const messageValue = new StringValue(false);
        messageValue.value = message;

        try_log(levelValue, messageValue, value);
    }

    function error(message: string): void {
        log(LogLevel.Error, message, null);
    }

    function errorWithContext(message: string, context: StructValue): void {
        log(LogLevel.Error, message, context);
    }

    function warn(message: string): void {
        log(LogLevel.Warn, message, null);
    }

    function warnWithContext(message: string, context: StructValue): void {
        log(LogLevel.Warn, message, context);
    }

    function info(message: string): void {
        log(LogLevel.Info, message, null);
    }

    function infoWithContext(message: string, context: StructValue): void {
        log(LogLevel.Info, message, context);
    }

    function debug(message: string): void {
        log(LogLevel.Debug, message, null);
    }

    function debugWithContext(message: string, context: StructValue): void {
        log(LogLevel.Debug, message, context);
    }

    function trace(message: string): void {
        log(LogLevel.Trace, message, null);
    }

    function traceWithContext(message: string, context: StructValue): void {
        log(LogLevel.Trace, message, context);
    }
}
