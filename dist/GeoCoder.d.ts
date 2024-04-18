import L from 'leaflet';
type Normalizer = (address: string, options?: any) => Promise<NormalizeResult>;
interface NormalizeResult {
    lat: number | null;
    lng: number | null;
    pref: string;
    city: string;
    town: string;
    addr: string;
    level: number;
}
export declare class GeoCoder extends L.Control {
    _div: HTMLElement | undefined;
    private normalizer;
    private map;
    constructor(normalizer: Normalizer, options?: L.ControlOptions);
    onAdd: (map: L.Map) => HTMLElement;
    /**
     * Leaflet地図とGeoCoderを関連付けます
     */
    on: (map: L.Map) => void;
    /**
     * 引数に指定した住所周辺の地図を表示します
     * @param address 住所
     */
    search: (address: string) => Promise<void>;
    /**
     * コンストラクタで指定した住所パーサーと、@geolonia/japanese-addressesのデータを利用してジオコーディングを行ないます
     */
    private normalizeAddress;
}
export {};
