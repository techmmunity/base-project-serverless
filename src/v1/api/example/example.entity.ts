import {
	BaseEntity,
	Column,
	Entity,
	Repository,
	ObjectIdColumn,
	ObjectID,
} from "typeorm";

@Entity("example")
export class ExampleEntity extends BaseEntity {
	@ObjectIdColumn({
		name: "_id",
	})
	public id: ObjectID;

	@Column()
	public thisIsAnParam: string;
}

export type ExampleRepository = Repository<ExampleEntity>;
