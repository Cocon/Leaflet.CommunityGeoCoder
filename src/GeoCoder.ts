import L from 'leaflet';
import * as Geolonia from '@geolonia/normalize-japanese-addresses';

import PopupContent from './PopupContent';
import Control from './Control';

class Utils {
	static createPin = (map: L.Map, latlng: L.LatLng, data: { pref: string, city: string, town: string }) => {
		const marker = L.marker(latlng);
		const popup = L.popup().setContent(new PopupContent({
			"都道府県": data.pref,
			"市区町村": data.city,
			"町名": data.town,
			"緯度": latlng.lat,
			"経度": latlng.lng
		}));
		marker.bindPopup(popup);
		marker.setLatLng(latlng);
		marker.addTo(map);
		marker.openPopup();
	}
	static moveTo = (map: L.Map, location: L.LatLng) => {
		map.flyTo(location);
	};
};

export class GeoCoder extends L.Control {
	_div: HTMLElement | undefined;
	constructor(options?: L.ControlOptions) {
		super(options);
	}

	onAdd = (map: L.Map) => {
		this._div = L.DomUtil.create("div", "leaflet-community-geocoder");
		this._div.appendChild(new Control(GeoCoder.geoCoder(map)));
		return this._div;
	}

	static geoCoder = (map: L.Map) => {
		return async (address: string) => {
			const result = await Geolonia.normalize(address);
			console.log(result);
			if (result.level >= 3) {
				// level 3 まで判別できた場合には、緯度経度情報も返ってくる
				// https://github.com/geolonia/normalize-japanese-addresses/pull/113
				const latlng = L.latLng({
					lat: result.lat || 35,
					lng: result.lng || 135
				});
				Utils.moveTo(map, latlng);
				Utils.createPin(map, latlng, {
					pref: result.pref,
					city: result.city,
					town: result.town
				});
			} else if (result.level == 2) {
				// level 2 までしか判別できなかった場合は、
				// 別途データベースに問い合わせ、大まかな位置情報を取得する
				const url = `https://geolonia.github.io/japanese-addresses/api/ja/${result.pref}/${result.city}.json`;
				fetch(url).then(response => response.json()).then(json => {
					const destination = json[0] as {
						town: string
						koaza: string
						lat: string
						lng: string
					};
					const latlng = L.latLng({
						lat: parseFloat(destination.lat),
						lng: parseFloat(destination.lng)
					});
					Utils.moveTo(map, latlng);
					Utils.createPin(map, latlng, {
						pref: result.pref,
						city: result.city,
						town: destination.town + destination.koaza
					});
				});
			} else {
				alert("もう少し詳しい住所を入力してください");
			}
		}
	}
}