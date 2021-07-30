import L from 'leaflet';
import * as Geolonia from '@geolonia/normalize-japanese-addresses';
import React from 'react';
import ReactDOM from 'react-dom';

import Interface from './Interface';

class Utils {
	static normalize = (address: string): L.LatLng => {
		Geolonia.normalize(address).then(result => {
			const output = Object.entries(result).map(entry => {
				return entry.join(":\t");
			}).join("\n");
			console.log(result);
			alert(output);
		});
		return L.latLng(35.0, 135.0);
	};
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
		return (address: string) => {
			const destination = Utils.normalize(address);
			Utils.moveTo(map, destination);
		}
	}
}