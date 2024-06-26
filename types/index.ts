// ~/types/index.ts


export type SomeType = [boolean, string, number];

export interface formfieldInterface {
    isValid: boolean,
    val: string,
    required: boolean,
    format?: RegExp,
    errorMsg?: string
}

export interface DrugDetailsInterface {
    "ชื่อยา": string,
    "ข้อบ่งใช้": string,
    "วิธีรับประทาน": string,
    "อาการไม่พึงประสงค์": { [key: string]: string; },
    "อันตรกิริยาระหว่างยา - ยา": string
}

export const enum GlobalConstEnum {

}

export interface DrugInterface {
    Name: string
    Indication?: string
    Consumation?: string
    ADR?: Object
    DrugInteraction?: string
}

