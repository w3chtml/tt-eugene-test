export interface TransactionCreateModel {
    acc: string;
    amount: number;
    currency: string;
    destination: string;
    isPaidFee: boolean;
    metadata: Metadata[];
}

interface Metadata {
    keyData: string;
    valueData: string;
}