export enum ValueId {
    Result = 0,

    Null,

    Boolean,

    Int8,
    Int16,
    Int32,
    Int64,
    UInt8,
    UInt16,
    UInt32,
    UInt64,

    Float32,
    Float64,

    Decimal128,
    Decimal256,

    BigInteger, // bits, value
    BigDecimal, // scale, precision, value

    Time32,
    Time64,

    Date32,
    Date64,

    Binary,
    FixedSizeBinary,
    LargeBinary,

    Utf16,
    LargeUtf16,

    List,

    Struct,
}

export class Value {
    protected id: u8;
    protected nullable: boolean;

    constructor(id: i32, nullable: boolean) {
        this.id = id as u8;
        this.nullable = nullable;
    }
}

export class ResultValue extends Value {
    private readonly _ok: boolean;
    private readonly _err: Value;
    private readonly _value: Value;

    constructor() {
        super(ValueId.Result, false);
        this._err = new NullValue();
        this._value = new NullValue();
    }

    get ok(): boolean {
        return this._ok;
    }

    get err(): Value {
        return this._err;
    }

    get value(): Value {
        return this._value;
    }
}

export class NullValue extends Value {
    constructor() {
        super(ValueId.Null, true);
    }
}

export class BooleanValue extends Value {
    private _value: boolean;

    constructor(nullable: boolean) {
        super(ValueId.Boolean, nullable);

        this._value = false;
    }

    get value(): boolean {
        return this._value;
    }

    set value(value: boolean) {
        this._value = value;
    }
}

export class Int8Value extends Value {
    private _value: i8;

    constructor(nullable: boolean) {
        super(ValueId.Int8, nullable);

        this._value = 0;
    }

    get value(): i8 {
        return this._value;
    }

    set value(value: i8) {
        this._value = value;
    }
}

export class Int16Value extends Value {
    private _value: i16;

    constructor(nullable: boolean) {
        super(ValueId.Int16, nullable);

        this._value = 0;
    }

    get value(): i16 {
        return this._value;
    }

    set value(value: i16) {
        this._value = value;
    }
}

export class Int32Value extends Value {
    private _value: i32;

    constructor(nullable: boolean) {
        super(ValueId.Int32, nullable);

        this._value = 0;
    }

    get value(): i32 {
        return this._value;
    }

    set value(value: i32) {
        this._value = value;
    }
}

export class Int64Value extends Value {
    private _value: i64;

    constructor(nullable: boolean) {
        super(ValueId.Int64, nullable);

        this._value = 0;
    }

    get value(): i64 {
        return this._value;
    }

    set value(value: i64) {
        this._value = value;
    }
}

export class UInt8Value extends Value {
    private _value: u8;

    constructor(nullable: boolean) {
        super(ValueId.UInt8, nullable);

        this._value = 0;
    }

    get value(): u8 {
        return this._value;
    }

    set value(value: u8) {
        this._value = value;
    }
}

export class UInt16Value extends Value {
    private _value: u16;

    constructor(nullable: boolean) {
        super(ValueId.UInt16, nullable);

        this._value = 0;
    }

    get value(): u16 {
        return this._value;
    }

    set value(value: u16) {
        this._value = value;
    }
}

export class UInt32Value extends Value {
    private _value: u32;

    constructor(nullable: boolean) {
        super(ValueId.UInt32, nullable);

        this._value = 0;
    }

    get value(): u32 {
        return this._value;
    }

    set value(value: u32) {
        this._value = value;
    }
}

export class UInt64Value extends Value {
    private _value: u64;

    constructor(nullable: boolean) {
        super(ValueId.UInt64, nullable);

        this._value = 0;
    }

    get value(): u64 {
        return this._value;
    }

    set value(value: u64) {
        this._value = value;
    }
}

export class Float32Value extends Value {
    private _value: f32;

    constructor(nullable: boolean) {
        super(ValueId.Float32, nullable);

        this._value = 0.0;
    }

    get value(): f32 {
        return this._value;
    }

    set value(value: f32) {
        this._value = value;
    }
}

export class Float64Value extends Value {
    private _value: f64;

    constructor(nullable: boolean) {
        super(ValueId.Float64, nullable);

        this._value = 0.0;
    }

    get value(): f64 {
        return this._value;
    }

    set value(value: f64) {
        this._value = value;
    }
}

export class DecimalPrimitive {
    public readonly scale: u8;
    public readonly precision: u8;
    public readonly value: Array<u8>;

    constructor(scale: u8, precision: u8, value: Array<u8>) {
        this.scale = scale;
        this.precision = precision;
        this.value = value;
    }
}

export class BigIntegerPrimitive {
    public readonly bits: u16;
    public readonly value: Array<u8>;

    constructor(bits: u16, value: Array<u8>) {
        this.bits = bits;
        this.value = value;
    }
}

export class FixedSizeBinaryPrimitive {
    public readonly size: u32;
    public readonly value: Array<u8>;

    constructor(size: u32, value: Array<u8>) {
        this.size = size;
        this.value = value;
    }
}

export const TimePrimitiveUnitSecond = 'Second';
export const TimePrimitiveUnitMillisecond = 'Millisecond';
export const TimePrimitiveUnitMicrosecond = 'Microsecond';
export const TimePrimitiveUnitNanosecond = 'Nanosecond';

const validTimeUnits = [
    TimePrimitiveUnitSecond,
    TimePrimitiveUnitMillisecond,
    TimePrimitiveUnitMicrosecond,
    TimePrimitiveUnitNanosecond,
];

export class TimePrimitive {
    public readonly unit: string;
    public readonly value: Array<u8>;

    constructor(unit: string, value: Array<u8>) {
        if (!validTimeUnits.includes(unit)) {
            throw new Error('Unexpected value for unit');
        }

        this.unit = unit;
        this.value = value;
    }
}

export class Decimal128Value extends Value {
    private _scale: u8;
    private _precision: u8;
    private _value: Array<u8>;

    constructor(scale: u8, precision: u8, nullable: boolean) {
        super(ValueId.Decimal128, nullable);

        this._scale = scale;
        this._precision = precision;
        this._value = [];
    }

    get scale(): u8 {
        return this._scale;
    }

    set scale(value: u8) {
        this._scale = value;
    }

    get precision(): u8 {
        return this._precision;
    }

    set precision(value: u8) {
        this._precision = value;
    }

    get value(): DecimalPrimitive {
        return new DecimalPrimitive(this._scale, this._precision, this._value);
    }

    set value(value: DecimalPrimitive) {
        if (this._scale === value.scale) {
            throw new Error('Invalid scale');
        }

        if (this._precision === value.precision) {
            throw new Error('Invalid precision');
        }

        this._value = value.value;
    }
}

export class Decimal256Value extends Value {
    private _scale: u8;
    private _precision: u8;
    private _value: Array<u8>;

    constructor(scale: u8, precision: u8, nullable: boolean) {
        super(ValueId.Decimal256, nullable);

        this._scale = scale;
        this._precision = precision;
        this._value = [];
    }

    get scale(): u8 {
        return this._scale;
    }

    set scale(value: u8) {
        this._scale = value;
    }

    get precision(): u8 {
        return this._precision;
    }

    set precision(value: u8) {
        this._precision = value;
    }

    get value(): DecimalPrimitive {
        return new DecimalPrimitive(this._scale, this._precision, this._value);
    }

    set value(value: DecimalPrimitive) {
        if (this._scale === value.scale) {
            throw new Error('Invalid scale');
        }

        if (this._precision === value.precision) {
            throw new Error('Invalid precision');
        }

        this._value = value.value;
    }
}

export class BigIntegerValue extends Value {
    private _bits: u16;
    private _value: Array<u8>;

    constructor(bits: u16, nullable: boolean) {
        super(ValueId.BigInteger, nullable);

        this._bits = bits;
        this._value = [];
    }

    get bits(): u16 {
        return this._bits;
    }

    set bits(value: u16) {
        this._bits = value;
    }

    get value(): BigIntegerPrimitive {
        return new BigIntegerPrimitive(this.bits, this._value);
    }

    set value(value: BigIntegerPrimitive) {
        if (this._bits !== value.bits) {
            throw new Error('Invalid bits');
        }

        this._value = value.value;
    }
}

export class BigDecimalValue extends Value {
    private _scale: u8;
    private _precision: u8;
    private _value: Array<u8>;

    constructor(scale: u8, precision: u8, nullable: boolean) {
        super(ValueId.BigDecimal, nullable);

        this._scale = scale;
        this._precision = precision;
        this._value = [];
    }

    get scale(): u8 {
        return this._scale;
    }

    set scale(value: u8) {
        this._scale = value;
    }

    get precision(): u8 {
        return this._precision;
    }

    set precision(value: u8) {
        this._precision = value;
    }

    get value(): DecimalPrimitive {
        return new DecimalPrimitive(this._scale, this._precision, this._value);
    }

    set value(value: DecimalPrimitive) {
        this._scale = value.scale;
        this._precision = value.precision;
        this._value = value.value;
    }
}

export class Time32Value extends Value {
    private _unit: u8;
    private _value: u32;

    constructor(unit: u8, nullable: boolean) {
        super(ValueId.Time32, nullable);

        this._unit = unit;
        this._value = 0;
    }

    get unit(): u8 {
        return this._unit;
    }

    set unit(value: u8) {
        this._unit = value;
    }

    get value(): u32 {
        return this._value;
    }

    set value(value: u32) {
        this._value = value;
    }
}

export class Time64Value extends Value {
    private _unit: u8;
    private _value: u64;

    constructor(unit: u8, nullable: boolean) {
        super(ValueId.Time64, nullable);

        this._unit = unit;
        this._value = 0;
    }

    get unit(): u8 {
        return this._unit;
    }

    set unit(value: u8) {
        this._unit = value;
    }

    get value(): u64 {
        return this._value;
    }

    set value(value: u64) {
        this._value = value;
    }
}

export class Date32Value extends Value {
    private _value: u32;

    constructor(nullable: boolean) {
        super(ValueId.Date32, nullable);

        this._value = 0;
    }

    get value(): u32 {
        return this._value;
    }

    set value(value: u32) {
        this._value = value;
    }
}

export class Date64Value extends Value {
    private _value: u64;

    constructor(nullable: boolean) {
        super(ValueId.Date64, nullable);

        this._value = 0;
    }

    get value(): u64 {
        return this._value;
    }

    set value(value: u64) {
        this._value = value;
    }
}

export class FixedSizeBinaryValue extends Value {
    private _size: u32;
    private _value: Array<u8>;

    constructor(size: u32, nullable: boolean) {
        super(ValueId.FixedSizeBinary, nullable);

        this._size = size;
        this._value = [];
    }

    get size(): u32 {
        return this._size;
    }

    set size(value: u32) {
        this._size = value;
    }

    get value(): FixedSizeBinaryPrimitive {
        return new FixedSizeBinaryPrimitive(this._size, this._value);
    }

    set value(value: FixedSizeBinaryPrimitive) {
        if (this._size !== value.size) {
            throw new Error('Invalid size');
        }

        this._value = value.value;
    }
}

export class BinaryValue extends Value {
    private _value: Array<u8>;

    constructor(nullable: boolean) {
        super(ValueId.Binary, nullable);

        this._value = [];
    }

    get value(): Array<u8> {
        return this._value;
    }

    set value(value: Array<u8>) {
        this._value = value;
    }
}

export class LargeBinaryValue extends Value {
    private _value: Array<u8>;

    constructor(nullable: boolean) {
        super(ValueId.LargeBinary, nullable);

        this._value = [];
    }

    get value(): Array<u8> {
        return this._value;
    }

    set value(value: Array<u8>) {
        this._value = value;
    }
}

export class StringValue extends Value {
    private _value: string;

    constructor(nullable: boolean) {
        super(ValueId.Utf16, nullable);

        this._value = '';
    }

    get value(): string {
        return this._value;
    }

    set value(value: string) {
        this._value = value;
    }
}

export class LargeStringValue extends Value {
    private _value: string;

    constructor(nullable: boolean) {
        super(ValueId.LargeUtf16, nullable);

        this._value = '';
    }

    get value(): string {
        return this._value;
    }

    set value(value: string) {
        this._value = value;
    }
}

export class ListValue<T> extends Value {
    private _values: Array<T>;

    constructor(nullable: boolean) {
        super(ValueId.List, nullable);

        this._values = [];
    }

    get value(): Array<T> {
        return this._values;
    }

    set value(value: Array<T>) {
        this._values = value;
    }
}

export class StructValue extends Value {
    private _keys: Array<StringValue>;
    private _values: Array<Value>;

    constructor(keys: Array<string>, values: Array<Value>, nullable: boolean) {
        super(ValueId.Struct, nullable);

        const convertedKeys: Array<StringValue> = [];

        for (let i = 0; i < keys.length; i++) {
            const str = new StringValue(false);

            str.value = keys[i];

            convertedKeys.push(str);
        }

        this._keys = convertedKeys;
        this._values = values;
    }

    getMap(): Map<string, Value> {
        const map: Map<string, Value> = new Map<string, Value>();

        for (let i = 0; i < this._keys.length; i++) {
            map.set(this._keys[i].value, this._values[i]);
        }

        return map;
    }

    get value(): StructValue {
        return this;
    }

    get keys(): Array<StringValue> {
        return this._keys;
    }

    set keys(value: Array<StringValue>) {
        this._keys = value;
    }

    @operator('[]')
    __get(key: string): Value {
        return this.get(key);
    }

    public get(key: string): Value {
        for (let i = 0; i < this._keys.length; i++) {
            if (this._keys[i].value == key) {
                return this._values[i];
            }
        }

        throw new Error('Unknown key');
    }

    public set(key: string, value: Value): void {
        for (let i = 0; i < this._keys.length; i++) {
            if (this._keys[i].value == key) {
                this._values[i] = value;
            }
        }

        throw new Error('Unknown key');
    }
}
