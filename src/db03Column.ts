import { Sequelize, Table, Column, Model, HasMany, DataType, CreatedAt, UpdatedAt, DeletedAt } from "sequelize-typescript";

@Table({
    indexes: [
        { fields: ["location"] }    // ユニークじゃないインデックスはこう書かないといけないらしい。@Columnに書きたい。
    ]
})
export class Office extends Model<Office> {
    @Column
    name: string;   // string = verchar(255)

    @Column
    location: string;

    @CreatedAt  // タイムスタンプ
    creationDate: Date;

    @UpdatedAt  // タイムスタンプ
    updatedOn: Date;

    @DeletedAt  // タイムスタンプ
    deletionDate: Date;

}

/**
 * Sequelizeは"sequelize-typescript"の定義を使う
 */
const sequelize = new Sequelize({
    dialect: "mysql",   // 'mysql'|'sqlite'|'postgres'|'mssql'
    host: "localhost",
    database: "SequelizeSample",
    username: "nodesample",
    password: "thepassword",
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

sequelize.addModels([Office]);

async function entry() {

  await sequelize.sync();


  // INSERT
  for (let i = 0; i < 3; i++) {
    const office = new Office();
    office.name = "Office" + i;
    office.location = "東京";
    await office.save();
  }

  // SELECT
  const selected = await Office.findAll<Office>({ where: { location: "東京" } });
  console.log(selected);

  // UPDATE
  selected[0].name = "おれおれ";
  await selected[0].save();

  // DELETE
  await Person.destroy({ where: { name: "おれおれ" } });

}
entry();
