import L from 'leaflet';
import React from 'react';
import ReactDOM from 'react-dom';

import Interface from './Interface';

export class GeoCoder extends L.Control {
	_div: HTMLElement | undefined;
	constructor(options?: L.ControlOptions) {
		super(options);
	}

	onAdd = (map: L.Map) => {
		this._div = L.DomUtil.create("div", "leaflet-community-geocoder");
		ReactDOM.render(
			<Interface />,
			this._div
		);
		return this._div;
	}

	public init = () => {
		ReactDOM.render(<Interface />, document.querySelector(".leaflet-community-geocoder"));
	}
}