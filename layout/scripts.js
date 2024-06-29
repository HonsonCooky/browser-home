import { loadKeymap } from "../assets/global.js";
loadKeymap();

// Honestly, I just fiddled till I got something that looked like JSON... haha
function keymapToJson(keymapTxt) {
	const keymapIndex = keymapTxt.indexOf("keymap {");
	if (keymapIndex === -1) {
		console.error("Unable to find keymap in keymap file");
		return;
	}
	const mapping = keymapTxt
		.substring(keymapIndex + 6, keymapTxt.length - 5)
		.replaceAll(";", ",")
		.replaceAll("<", "{")
		.replaceAll(">", "}")
		.replaceAll(/(\w+)\s*\{/g, (match) => `"${match.substring(0, match.length - 2)}" = {`)
		.replaceAll(/(\w+)\s*=/g, (match) => `"${match.substring(0, match.length - 2)}" =`)
		.replaceAll(" =", ":")
		.replaceAll(/(&\S{2,})+( \S+)*\s*/g, (match) => {
			if (match.includes('"')) return match;
			return `"${match.trim()}",\n`;
		})
		.replaceAll(/("bindings":)\s*{([^}]*)}/g, "$1 [$2]")
		.replaceAll(/,\s*],/g, "]")
		.replaceAll(/,\s*([}\]])/g, "$1");
	return JSON.parse(mapping);
}

function generateHtmlElements(map) {
	// I'd rather just hard-code this information
	const rowKeyCounts = [10, 12, 12, 12, 18, 16];
	const max = 18;
	const layers = Object.entries(map).filter((e) => e[0].includes("layer"));

	// Create all elements
	const layerDivs = [];
	for (const layer of layers) {
		const layerDiv = document.createElement("div");
		layerDiv.id = layer[0];
		layerDiv.className = "layer";
		layerDivs.push(layerDiv);

		const layerTitle = document.createElement("h2");
		layerTitle.innerText = layer[0].replace("layer_", "");
		layerDiv.appendChild(layerTitle);

		const layerPreview = document.createElement("div");
		layerPreview.className = "preview";
		layerDiv.appendChild(layerPreview);

		// Generate an array of arrays with size "max"
		// Each array[x] represents a row
		// Each array[x][y] represents a key, with "undefined" being a placeholder space.
		const bindings = layer[1].bindings;
		let runningIndex = 0;
		const rowGroups = rowKeyCounts
			.map((count) => {
				const slice = bindings.slice(runningIndex, runningIndex + count);
				runningIndex += count;
				return { slice, count };
			})
			.map(({ slice, count }) => {
				const diff = max - count;
				const middle = Math.floor(diff / 2);
				const fill = new Array(diff).fill(undefined);
				slice.splice(middle + 1, 0, ...fill);
				return slice;
			});

		// Generate the keys for this layer
		for (let i = 0; i < rowGroups.length; i++) {
			const row = rowGroups[i];
			const rowDiv = document.createElement("div");
			rowDiv.className = "row";
			layerPreview.appendChild(rowDiv);

			for (const key of row) {
				const keyDiv = document.createElement("div");
				if (key != undefined) {
					const [type, value] = key.split(" ");
					const typeSpan = document.createElement("span");
					typeSpan.innerText = type;
					typeSpan.className = "type";
					keyDiv.appendChild(typeSpan);

					if (value) {
						const valueSpan = document.createElement("span");
						valueSpan.innerText = value;
						valueSpan.className = "value";
						keyDiv.appendChild(valueSpan);
					}

					keyDiv.id = `${key}-${i}-${layer[0]}`;
					keyDiv.className = "key";
				} else {
					keyDiv.className = "empty-key";
				}
				rowDiv.appendChild(keyDiv);
			}
		}
	}

	return layerDivs;
}

async function loadMapping() {
	const keymapTxt = await fetch("./layout.keymap").then((res) => res.text());
	if (!keymapTxt) {
		console.error("Unable to load keymap file");
		return;
	}

	const keymapDiv = document.getElementById("keymap");
	const map = keymapToJson(keymapTxt);
	const layers = generateHtmlElements(map);
	layers.forEach((element) => {
		keymapDiv.appendChild(element);
	});
}

loadMapping();
