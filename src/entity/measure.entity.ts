import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ schema: "public", name: "measures" })
export class Measures {
  @PrimaryGeneratedColumn("uuid")
  measure_uuid: string;

  @Column()
  customer_code: string;

  @Column()
  image_url: string;

  @Column("decimal")
  measure_value: number;

  @Column("timestamp")
  measure_datetime: Date;

  @Column()
  measure_type: string;

  @Column("boolean")
  has_confirmed: boolean;
}
