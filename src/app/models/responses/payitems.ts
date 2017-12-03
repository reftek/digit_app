import { Payitem } from "app/models/data/payitem";

export interface PayitemsResponse {
    total: number;
    to: number;
    from: number;
    current_page: number
    per_page: number;
    next_page_url: string;
    prev_page_url: string;
    data: Payitem[];
}