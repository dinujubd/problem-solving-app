import low from 'lowdb';
import * as uuid from 'uuid';
import FileSync from 'lowdb/adapters/FileSync';

const collection_name = 'problems';

export interface Complexity {
    timeComplexity: string;
    spaceComplexity: string;
}

export interface Solution {
    algorithms: string[];
    dataStructures: string[];
    complexity: Complexity;
    comments: string[];
    sourceFile: string;
}

export interface Problem {
    title: string;
    level: string;
    algorithms: string[];
    dataStructures: string[];
    solutions: Solution[];
    summary: string[];
    id: string;
}

export interface Propblems {
    problems: Problem[];
}

const adapter = new FileSync<Propblems>('db.json');
const db = low(adapter);

const get = (problem_id: string) => {
    return db.get(collection_name, []).find({ id: problem_id });
};
const list = (pageNo = 0, pageSize = 20) => {
    return db
        .get(collection_name, [])
        .drop(pageNo * pageSize)
        .take(pageSize);
};

const create = (problem: Problem) => {
    db.defaults({ problems: [] }).write();
    problem.id = uuid.v4();
    return db.get(collection_name, []).push(problem).write();
};

const update = (problem: Problem) => {
    const index = db.get(collection_name, []).findIndex({ id: problem.id });
    db.set(`${collection_name}[${index}]`, problem).write();

    return get(problem.id);
};

const remove = (problem_id: any) => {
    return db.get(collection_name, []).remove({ id: problem_id }).write();
};

const search = (query = '', pageNo = 0, pageSize = 20) => {
    return db
        .get(collection_name)
        .filter((problem: any) => {
            return JSON.stringify(problem).search(query) > -1;
        })
        .drop(pageNo * pageSize)
        .take(pageSize);
};

export { create, get, list, search, update, remove };
