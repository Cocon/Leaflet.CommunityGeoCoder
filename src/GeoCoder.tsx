import L from 'leaflet';
import * as Geolonia from '@geolonia/normalize-japanese-addresses';
import React from 'react';
import ReactDOM from 'react-dom';

import Interface from './Interface';

class Utils {
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
		ReactDOM.render(
			<Interface logic={GeoCoder.geoCoder(map)} />,
			this._div
		);
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
				});
			} else {
				alert("もう少し詳しい住所を入力してください");
			}
		}
	}
}