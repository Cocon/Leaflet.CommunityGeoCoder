import L from 'leaflet';

import Control from './Control';
import PopupContent from './PopupContent';

interface ParsedAddress { pref: string, city: string, town: string }
type Normalizer = (address: string, options?: any) => Promise<NormalizeResult>
interface NormalizeResult {
	lat: number | null,
	lng: number | null,
	pref: string,
	city: string,
	town: string,
	addr: string,
	level: number
}

class Utils {
	/**
	 * 引数で指定した位置にピンをポップアップマーカーを立てる
	 */
	static createPin = (map: L.Map, latlng: L.LatLng, data: ParsedAddress) => {
		const marker = L.marker(latlng, {
			alt: `${data.pref} ${data.city} ${data.town}`
		});
		const popup = L.popup().setContent(new PopupContent({
			"都道府県": data.pref,
			"市区町村": data.city,
			"町名": data.town,
			"緯度": latlng.lat,
			"経度": latlng.lng
		}));
		marker.bindPopup(popup); // popupをmarkerに関連付ける
		marker.setLatLng(latlng); // markerに緯度経度を設定
		marker.addTo(map); // markerをmapに追加
		marker.openPopup(); // popupを開く 
	}
	/**
	 * 引数で指定した位置に地図の中心を移動する
	 */
	static moveTo = (map: L.Map, location: L.LatLng) => {
		map.flyTo(location);
	};
};

export class GeoCoder extends L.Control {
	_div: HTMLElement | undefined;
	private normalizer: Normalizer;
	private map: L.Map | undefined;

	constructor(normalizer: Normalizer, options?: L.ControlOptions) {
		super(options);
		this.normalizer = normalizer
	}

	override onAdd = (map: L.Map) => {
		this.map = map;
		this._div = L.DomUtil.create("div", "leaflet-community-geocoder");
		this._div.appendChild(new Control(this.search));
		return this._div;
	}

	/** 
	 * Leaflet地図とGeoCoderを関連付けます
	 */
	on = (map: L.Map) => {
		this.map = map
	}

	/**
	 * 引数に指定した住所周辺の地図を表示します
	 * @param address 住所
	 */
	search = async (address: string) => {
		if (this.map == undefined) {
			throw Error("searchメソッドを呼ぶ前に、GeoCoderをL.Mapオブジェクトと関連付ける必要があります")
		} else {
			try {
				const result = await this.normalizeAddress(address)
				Utils.moveTo(this.map, result.latlng)
				Utils.createPin(this.map, result.latlng, result.parsedAddress)
			} catch (error) {
				alert(error)
			}
		}
	}

	/**
	 * コンストラクタで指定した住所パーサーと、@geolonia/japanese-addressesのデータを利用してジオコーディングを行ないます
	 */
	private normalizeAddress = async (address: string): Promise<{ latlng: L.LatLng, parsedAddress: ParsedAddress }> => {
		const result = await this.normalizer(address);
		if (result.level >= 3) {
			// level 3 まで判別できた場合には、緯度経度情報も返ってくる
			// https://github.com/geolonia/normalize-japanese-addresses/pull/113
			return {
				latlng: L.latLng({ lat: result.lat as number, lng: result.lng as number }),
				parsedAddress: { pref: result.pref, city: result.city, town: result.town }
			}
		} else if (result.level == 2) {
			// level 2 までしか判別できなかった場合は、
			// 別途データベースに問い合わせ、大まかな位置情報を取得する
			const url = `https://geolonia.github.io/japanese-addresses/api/ja/${result.pref}/${result.city}.json`;
			const json = await fetch(url).then(response => response.json())
			const destination = json[0] as {
				town: string
				koaza: string
				lat: string
				lng: string
			};
			return {
				latlng: L.latLng({ lat: parseFloat(destination.lat), lng: parseFloat(destination.lng) }),
				parsedAddress: { pref: result.pref, city: result.city, town: result.town }
			}
		} else {
			throw Error("もう少し詳しい住所を入力してください");
		}
	}
}