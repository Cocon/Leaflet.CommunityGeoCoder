export default class PopupContent extends HTMLElement {
	constructor(data: { [label: string]: string | number }) {
		super();

		const shadowDOM = this.attachShadow({
			mode: "open"
		});
		const table = document.createElement("table");
		const tbody = document.createElement("tbody");
		Object.entries(data).forEach(datum => {
			const row = document.createElement("tr");
			const label = document.createElement("td");
			label.innerText = datum[0];
			row.appendChild(label);
			const value = document.createElement("td");
			value.innerText = datum[1].toString();
			row.appendChild(value);
			tbody.appendChild(row);
		});
		table.appendChild(tbody);

		shadowDOM.appendChild(table);
	}
}
customElements.define("popup-content", PopupContent);