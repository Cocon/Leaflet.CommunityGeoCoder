import React from 'react';
import { normalize } from '@geolonia/normalize-japanese-addresses';

const executeNormalize = (address: string) => {
	normalize(address).then(result => {
		const output = Object.entries(result).map(entry => {
			entry.join(":");
		}).join("\n");
		alert(output);
	});
};

export interface InterfaceProps {
}

const Interface: React.FunctionComponent<InterfaceProps> = (props) => {
	const [textInput, setTextInput] = React.useState<string>("");
	const inputRef = React.useRef<HTMLInputElement>(null);
	const buttonRef = React.useRef<HTMLButtonElement>(null);
	const formStyle: React.CSSProperties = {
		display: "flex"
	};
	const buttonStyle: React.CSSProperties = {
		width: "50px"
	};

	const onEnterPressed = (event: KeyboardEvent) => {
		if (event.code === "Enter") {
			// 実行
			if (inputRef.current !== null) {
				setTextInput(inputRef.current.value);
				executeNormalize(textInput);
			}
		}
	}
	const onButtonClicked = (event: MouseEvent) => {
		if (inputRef.current !== null) {
			setTextInput(inputRef.current.value);
			executeNormalize(textInput);
		}
	}
	React.useEffect(() => {
		inputRef.current?.addEventListener("keydown", onEnterPressed);
		buttonRef.current?.addEventListener("click", onButtonClicked);
	}, []);

	return (
		<div style={formStyle} className="custom-panel leaflet-bar">
			<input type="text" placeholder="例: 東京都千代田区霞が関1-3-1" ref={inputRef} />
			<button style={buttonStyle} ref={buttonRef}>Go!</button>
		</div>
	)
}
export default Interface;
