import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Measure {
  @PrimaryGeneratedColumn("uuid")
  measure_uuid: string;

  @Column()
  customer_code: string;

  @Column({ nullable: true })
  image_url: string;

  @Column({ type: "integer", nullable: true })
  measure_value: number;

  @Column({ type: "timestamp" })
  measure_datetime: Date;

  @Column({ type: "varchar", length: 10 })
  measure_type: "WATER" | "GAS";

  @Column({ default: false })
  has_confirmed: boolean;
}
