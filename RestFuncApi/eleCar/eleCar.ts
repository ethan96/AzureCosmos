export interface EleCarInterface {
    id: string,
    brand: string,
    name: string,
    desc: string,
    price: number
}

export class EleCar implements EleCarInterface {
    id: string
    brand: string
    name: string
    desc: string
    price: number
    constructor() {}
}