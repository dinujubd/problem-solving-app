import { v4 } from "uuid";

import { Algorithm, DataStructure, Problem, Vendor } from "shared/types";

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

interface Database {
  vendors: Array<Vendor>;
  problems: Array<Problem>;
  dataStructures: Array<DataStructure>;
  algorithms: Array<Algorithm>;
}

export class DbOperations {
  adapter = null;
  db = null;
  constructor(private TName: keyof Database) {
    this.adapter = new FileSync("db.json");
    this.db = low(this.adapter);
    this.db
      .defaults({
        vendors: [],
        problems: [],
        algorithms: [],
        dataStructures: [],
      })
      .write();
  }

  get(id: string) {
    return this.db.get(this.TName).find({ id: id })[0];
  }

  list(pageNo: number = 0, pageSize: number = 20) {
    return this.db
      .get(this.TName)
      .drop(pageNo * pageSize)
      .take(pageSize)
      .value();
  }

  create(obj: Vendor | DataStructure) {
    obj.id = obj.id || v4();
    console.log(obj);
    return this.db.get(this.TName).push(obj).write();
  }
  update(obj: Problem | DataStructure | Algorithm | Vendor) {
    const index = this.db.get(this.TName).findIndex({ id: obj.id });
    this.db.set(`${this.TName}[${index}]`, obj).write();

    return this.get(obj.id);
  }
  delete(id: string) {
    return this.db.get(this.TName).remove({ id: id }).write();
  }

  search(query: string, pageNo: number = 0, pageSize: number = 20) {
    return this.db
      .get(this.TName)
      .filter((problem) => {
        return JSON.stringify(problem).search(query) > -1;
      })
      .drop(pageNo * pageSize)
      .take(pageSize);
  }
}
