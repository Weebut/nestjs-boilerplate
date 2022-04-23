import { convertPropsToObject } from 'src/libs/utils/convert-props-to-object.util';
import { DateVO } from '../value-objects/date.value-object';
import { ID } from '../value-objects/id.value-object';

export interface BaseEntityProps {
  id: ID;
  createdAt: DateVO;
  updatedAt: DateVO;
}

export interface CreateEntityProps<T> {
  id: ID;
  props: T;
  createdAt?: DateVO;
  updatedAt?: DateVO;
}

export abstract class Entity<EntityProps> {
  constructor({
    id,
    props,
    createdAt,
    updatedAt,
  }: CreateEntityProps<EntityProps>) {
    this.validateProps(props);

    const now = DateVO.now();

    this.setId(id);
    this.props = props;
    this._createdAt = createdAt || now;
    this._updatedAt = updatedAt || now;

    this.validate();
  }

  protected abstract _id: ID; // Implement freely
  protected readonly props: EntityProps;
  private readonly _createdAt: DateVO;
  private _updatedAt: DateVO;

  get id() {
    return this._id;
  }

  private setId(id: ID): void {
    this._id = id;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  static isEntity(entity: unknown): entity is Entity<unknown> {
    return entity instanceof Entity;
  }

  public equals(object?: Entity<EntityProps>): boolean {
    if (object === null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!Entity.isEntity(object)) {
      return false;
    }

    return this.id ? this.id === object.id : false;
  }

  public getCopy(): EntityProps & BaseEntityProps {
    const propsCopy = {
      id: this._id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      ...this.props,
    };
    return Object.freeze(propsCopy);
  }

  public toObject(): unknown {
    const plainProps = convertPropsToObject(this.props);

    const result = {
      id: this._id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      ...plainProps,
    };

    return Object.freeze(result);
  }

  public abstract validate(): void;
  public validateProps(props: EntityProps): void {
    // TODO : Validate props
    return;
  }
}