export default class Control extends HTMLElement {
	constructor(onButtonClicked: (text: string) => any) {
		super();

		const form = document.createElement("div");
		form.classList.add("custom-panel", "leaflet-bar");
		const input = document.createElement("input");
		input.type = "search";
		input.placeholder = "例: 東京都千代田区霞が関1-3-1"
		form.appendChild(input);
		const button = document.createElement("button");
		button.title = "Powered by geolonia/normalize-japanese-addresses"
		button.innerText = "検索";
		button.addEventListener("click", () => {
			console.log(input.value);
			onButtonClicked(input.value);
		});
		form.appendChild(button);

		const style = document.createElement("style");
		style.innerHTML = `
			div {
				display: flex;
				border: 2px solid rgba(0, 0, 0, 0.2);
				border-radius: 4px;
			}
			button {
				width: 50px;
				height: 50px;
				cursor: pointer;
			}
		`;

		const shadowDOM = this.attachShadow({
			mode: "open"
		});
		shadowDOM.appendChild(style);
		shadowDOM.appendChild(form);

	}
}
customElements.define("plugin-control", Control);