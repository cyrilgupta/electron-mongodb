const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

class Employees {
  dbName;
  client;

  constructor(uri, dbName) {
    this.uri = uri;
    this.dbName = dbName;
    this.client = new MongoClient(this.uri);
  }
  
  #getCollection = async () => {
    await this.client.connect();
    const db = this.client.db(this.dbName);
    const employees = db.collection("employees");
    return employees;
  };

  getEmployees = async () => {
    console.log(`Employees.js > getEmployees`);

    const employees = await this.#getCollection();
    let res = await employees.find({}).toArray();

    res = res.map((employee) => {
      return {
        id: employee._id.toHexString(),
        name: employee.name,
        position: employee.position,
        salary: employee.salary,
      };
    });
    console.log(res);
    return res;
  };

  addEmployee = async (employee) => {
    console.log(`Employee.js > addEmployee: ${employee}`);

    const employees = await this.#getCollection();
    return await employees.insertOne(employee);
  };

  updateEmployee = async (id, employee) => {
    console.log(`Employee.js > updateEmployee: ${employee}`);
 
    const employees = await this.#getCollection();
    return await employees.updateOne({ _id: new ObjectId(id) }, { $set: employee });
  };

  deleteEmployee = async (id) => {
    console.log(`Employee.js > deleteEmployee: ${id}`);

    const employees = await this.#getCollection();
    const res = await employees.deleteOne({ _id: new ObjectId(id) });
    return res.deletedCount > 0;
  };
}

module.exports = Employees;
