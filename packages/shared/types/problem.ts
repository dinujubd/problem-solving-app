import { Solution } from "./solution";

export interface Problem {
    id: string;
    title: string;
    link: string;
    solutions: Solution[]
}