import { Sequelize, Table, Column, Model, HasMany } from "sequelize-typescript";


// see http://docs.sequelizejs.com/manual/installation/getting-started
// see https://github.com/RobinBuschmann/sequelize-typescript#model-definition

// mysql> CREATE DATABASE IF NOT EXISTS SequelizeSample DEFAULT CHARACTER SET utf8;
// mysql> GRANT ALL ON SequelizeSample.* to nodesample@localhost IDENTIFIED BY 'thepassword';
// mysql> FLUSH PRIVILEGES;


@Table
class Person extends Model<Person> {

  @Column
  name: string;

  @Column
  birthday: Date;

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

sequelize.addModels([Person]);

async function entry() {
  await sequelize.sync();


  // INSERT
  const person = new Person();
  person.name = "おなまえ";
  person.birthday = new Date(1975, 0, 1);
  await person.save()
    .catch(err => {
      console.error("Error on the database:", err);
    });

  // SELECT
  const selected = await Person.findAll<Person>({ where: { name: "おなまえ" } })
    .then(person => {
      console.log(person);
      return person;
    });
  console.log(selected);

  // UPDATE
  selected[0].name = "おれおれ";
  await selected[0].save();

  // DELETE
  await Person.destroy({ where: { name: "おれおれ" } });

}
entry();