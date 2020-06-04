import { Platform } from './Platform';
import { Quote } from './Quote';
export class Coin {
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
    platform: Platform = new Platform();
    cmc_rank: number;
    last_updated: Date;
    quote: Quote = new Quote();
}
