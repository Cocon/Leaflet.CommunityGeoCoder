import React from 'react';

export interface InterfaceProps {
	logic: (address: string) => void
}

const Interface: React.FunctionComponent<InterfaceProps> = (props) => {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const buttonRef = React.useRef<HTMLButtonElement>(null);
	const formStyle: React.CSSProperties = {
		display: "flex",
	};
	const buttonStyle: React.CSSProperties = {
		width: "50px",
		height: "50px",
		border: "none",
		cursor: "pointer",
		appearance: "none",
		backgroundImage: `url("https://github.com/geolonia/logo/raw/master/svg/symbol.svg")`,
		backgroundSize: "cover"
	};

	React.useEffect(() => {
		buttonRef.current?.addEventListener("click", () => {
			props.logic(inputRef.current?.value || "");
		})
	}, []);

	return (
		<div style={formStyle} className="custom-panel leaflet-bar">
			<input type="search" placeholder="例: 東京都千代田区霞が関1-3-1" ref={inputRef} />
			<button style={buttonStyle} ref={buttonRef} title="Powered by geolonia/normalize-japanese-addresses">Go!</button>
		</div>
	)
}
export default Interface;
