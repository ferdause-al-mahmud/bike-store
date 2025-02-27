

export type IBike = {
    name: string;
    brand: string;
    price: number;
    image?: string;
    category: 'Mountain' | 'Road' | 'Sport' | 'Electric' | 'Superbike';
    description: string;
    quantity: number;
    inStock: boolean;
};

