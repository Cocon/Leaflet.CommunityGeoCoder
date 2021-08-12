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
			// level 3 まで判別できた場合には、緯度経度情報も返ってくる
			// https://github.com/geolonia/normalize-japanese-addresses/pull/113
			if (result.level >= 3) {
				const destination = L.latLng(result.lat as number, result.lng as number);
				Utils.moveTo(map, destination);
			} else {
				alert("もう少し詳しい住所を入力してください");
			}
		}
	}
}