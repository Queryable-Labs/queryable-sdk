export class Result<T> {
    private readonly _ok: boolean;
    private readonly _error: Error | null;
    private readonly _value: T | null;

    constructor(ok: boolean, error: Error | null, value: T | null) {
        this._ok = ok;
        this._error = error;
        this._value = value;
    }

    get ok(): boolean {
        return this._ok;
    }

    get error(): Error | null {
        return this._error;
    }

    get value(): T | null {
        return this._value;
    }
}
