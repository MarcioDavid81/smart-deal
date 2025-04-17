export interface ProductProps {
    id: number;
    name: string;
    description: string;
    unit: string;
    price: number;
    quantity: number;
}

export interface CustomerProps {
    id: number;
    name: string;
    adress: string;
    city: string;
    state: string;
    cep: string;
    phone: string;
    email: string;
    ie: string;
    cnpj: string;
}

export interface OrderProps {
    id: number;
    date: Date;
    number: string | null;
    type: string;
    productId: number;
    unit: string;
    price: number;
    customerId: number;
    description: string;
    quantity: number;
}