    export class Status {
        timestamp: Date;
        error_code: number;
        error_message?: any;
        elapsed: number;
        credit_count: number;
        notice?: any;
    }

    export class Platform {
        id: number;
        name: string;
        symbol: string;
        slug: string;
        token_address: string;
    }

    export class Usd {
        price: number;
        volume_24h: number;
        percent_change_1h: number;
        percent_change_24h: number;
        percent_change_7d: number;
        market_cap: number;
        last_updated: Date;
    }

    export class Quote {
        usd: Usd;
    }

    export class Datum {
        id: number;
        name: string;
        symbol: string;
        slug: string;
        num_market_pairs: number;
        date_added: Date;
        tags: string[];
        max_supply?: number;
        circulating_supply: number;
        total_supply: number;
        platform: Platform;
        cmc_rank: number;
        last_updated: Date;
        quote: Quote;
    }

    export class RootObject {
        status: Status;
        data: Datum[];
    }

