export interface Product {
    name: string;
    brand: string;
    price: number;
    review: number;
    rating: number;
    description: string;
    function: Set<string>;
    productImageUrl: string;
    productUrl: string;
}

const parseFunction = (funcString: string) : Set<string> => {
    if(!funcString) {
        return new Set();
    }

    return new Set(funcString.split('|'));
}

const parseRating = (ratingStr: string) : number => {
    const num = parseFloat(ratingStr);

    return isNaN(num) ? 0 : num;
}

export const getProducts = async () : Promise<Product[]> => {
    const data = await (await fetch("S3_FILE_PATH")).text()
    const lines = data.split("\n");
    return lines.map(product => {
        const parts = product.split(',');
        return {
            name: parts[0],
            brand: parts[1],
            price: parseFloat(parts[2]),
            review: parseInt(parts[3]),
            rating: parseRating(parts[4]),
            description: parts[5],
            function: parseFunction(parts[6]),
            productImageUrl: parts[7],
            productUrl: parts[8]
        }
    });
}