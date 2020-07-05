export interface DataStructure {
    id: string;
    name: string;
    short: string;
    parent?: DataStructure;
    children?: DataStructure[]
}