import L from 'leaflet';
import React from 'react';
import ReactDOM from 'react-dom';

import Interface from './Interface';

export class GeoCoder extends L.Control {
	_div: HTMLElement | null;
	constructor(options?: L.ControlOptions) {
		super(options);
		this._div = null;
	}

	onAdd = (map: L.Map) => {
		this._div = L.DomUtil.create("div", "leaflet-community-geocoder");
		ReactDOM.render(<Interface />, this._div);
		return this._div;
	}
}