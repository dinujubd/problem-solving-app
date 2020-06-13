import * as low from 'lowdb';
import * as uuidv4 from 'uuid';
import * as FileSync from 'lowdb/adapters/FileSync';

export class Problem {
    id: string;
}

export interface DataStructure {
    id: string;
}

export interface Algorithm {
    id: string;
}

export interface Vendor {
    id: string;
}

interface Database {
    vendors: Array<Vendor>;
    problems: Array<Problem>;
    dataStructures: Array<DataStructure>;
    algorithms: Array<Algorithm>;
}

export class DbOperations {
    adapter = new FileSync<Database>('db.json');
    db = low(this.adapter);

    constructor(private TName: keyof Database) {}

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

    create(obj: Problem | DataStructure | Algorithm | Vendor) {
        obj.id = uuidv4();

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
