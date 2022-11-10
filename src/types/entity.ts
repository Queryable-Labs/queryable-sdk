import { StringValue, StructValue, UInt64Value } from './value';
import { Store } from '../globals';

const entities: Map<string, Map<u64, Entity>> = new Map<
    string,
    Map<u64, Entity>
>();

export class Entity {
    protected __XXX_name__: string;
    protected __XXX_id__: u64;
    protected __XXX_value__: StructValue;

    constructor(name: string, id: u64, value: StructValue) {
        this.__XXX_name__ = name;
        this.__XXX_id__ = id;
        this.__XXX_value__ = value;

        if (!entities.has(name)) {
            entities.set(name, new Map<u64, Entity>());
        }

        entities.get(name).set(id, this);
    }

    public __XXX__id(): u64 {
        return this.__XXX_id__;
    }

    public __XXX__name(): string {
        return this.__XXX_name__;
    }

    public __XXX__value(): StructValue {
        return this.__XXX_value__;
    }
}

export function _XXX_hasEntity(entityName: string, id: u64): boolean {
    if (entities.has(entityName)) {
        if (entities.get(entityName).has(id)) {
            return true;
        }
    }

    return false;
}

export function _XXX_getEntity<T>(entityName: string, id: u64): T {
    if (_XXX_hasEntity(entityName, id)) {
        return entities.get(entityName).get(id) as T;
    }

    const entityNameValue = new StringValue(false);
    entityNameValue.value = entityName;

    const entityIdValue = new UInt64Value(false);
    entityIdValue.value = id;

    const entity: T = Store.load<T>(entityNameValue, entityIdValue);

    if (!entities.has(entityName)) {
        entities.set(entityName, new Map<u64, Entity>());
    }

    entities.get(entityName).set(id, entity as Entity);

    return entity;
}
