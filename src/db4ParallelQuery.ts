import { Sequelize, Table, Column, Model, HasMany, DataType, CreatedAt, UpdatedAt, DeletedAt } from "sequelize-typescript";
// import * as Promise from "bluebird";
// Error /// Duplicate identifier 'Promise'.Compiler reserves name 'Promise' in top level scope of a module containing async functions.
import * as Bluebird from "bluebird";

@Table({
    indexes: [
        { fields: ["location"] }    // ユニークじゃないインデックスはこう書かないといけないらしい。@Columnに書きたい。
    ]
})
export class Customer extends Model<Customer> {
    @Column
    name: string;   // string = verchar(255)

    @Column
    location: string;
}

@Table
export class Customer2 extends Model<Customer2> {
    @Column
    name: string;   // string = verchar(255)

    @Column
    location: string;
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
    logging: false,
    pool: {
        max: 10,
        min: 0,
        idle: 10000
    }
});

sequelize.addModels([Customer]);
sequelize.addModels([Customer2]);

async function entry() {

    await sequelize.sync();


    // INSERT
    let start = new Date();

    const tasks: any[] = [];
    for (let i = 0; i < 500; i++) {
        const customer = new Customer();
        customer.name = "Async Customer" + i;
        customer.location = "東京";
        tasks.push(customer.save());
        tasks.push(Customer.max("name"));

        const customer2 = new Customer2();
        customer2.name = "Sync Customer2" + i;
        customer2.location = "東京";
        tasks.push(customer2.save());

        tasks.push(Customer2.max("name"));
    }
    await Promise.all(tasks);
    const async_timespan = (new Date()).getTime() - start.getTime();

    start = new Date();

    for (let i = 0; i < 500; i++) {
        const customer = new Customer();
        customer.name = "Sync Customer" + i;
        customer.location = "東京";
        await customer.save();
        await Customer.max("name");

        const customer2 = new Customer2();
        customer2.name = "Sync Customer2" + i;
        customer2.location = "東京";
        await customer2.save();

        await Customer2.max("name");
    }
    const sync_timespan = (new Date()).getTime() - start.getTime();

    console.log("Insert async:" + async_timespan);
    console.log("Insert  sync:" + sync_timespan);


}
entry().then(() => {
    console.log("DONE!");
    process.exit();
});
