// ~/types/index.ts

export { };

declare global {
    type SomeType = [boolean, string, number];

    interface formfieldInterface {
        isValid: boolean,
        val: string,
        required: boolean,
        format?: RegExp,
        errorMsg?: string
    }

    interface DrugDetailsInterface {
        "ชื่อยา": string,
        "ข้อบ่งใช้": string,
        "วิธีรับประทาน": string,
        "อาการไม่พึงประสงค์": { [key: string]: string; },
        "อันตรกิริยาระหว่างยา - ยา": string
    }

    const enum GlobalConstEnum {

    }


}
