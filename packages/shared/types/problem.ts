import { Solution } from "./solution";

export interface Problem {
    id: string;
    title: string;
    link: string;
    vendor: string;
    level: string;
    description: string;
    solutions: Solution[];
}