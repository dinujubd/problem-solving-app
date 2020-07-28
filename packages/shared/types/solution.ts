export interface Solution {
    id: string;
    title: string;
    sourceCodes: {language: string; code: string;}[];
    dataStructures: string[];
    algorithms: string[];
    timeComplexity: string;
    spaceComplexity: string;
    level: string;
    comments: string;
}