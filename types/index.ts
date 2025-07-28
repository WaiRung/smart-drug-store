// ~/types/index.ts


export type SomeType = [boolean, string, number];

export interface formfieldInterface {
    isValid: boolean,
    val: string,
    required: boolean,
    format?: RegExp,
    errorMsg?: string
}

export type AdjustItem = {
    documentId: string
    GENERIC: string
    IMPAIREMENT: string | null
    GROUP: string | null
    IMPAIREMENT_STATUS: string | null
    ADJUSTED_DOSAGE: string | null
}

export const enum GlobalConstEnum {

}

export interface DrugInterface {
    DrugName: string
    Diagnoses?: string
}

