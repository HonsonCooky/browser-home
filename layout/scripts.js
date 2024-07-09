import { loadKeymap } from "../assets/global.js";
loadKeymap();


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
				const middle = count / 2;
				const fill = new Array(diff).fill(undefined);
				slice.splice(middle, 0, ...fill);
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
					typeSpan.className = ["&magic", "&sl", "&tog"].includes(type) ? "special-type" : "type";
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
	const keymap = await fetch("./layout.json").then((res) => res.json());
	if (!keymap) {
		console.error("Unable to load keymap file");
		return;
	}

	const layers = generateHtmlElements(keymap);
	layers.forEach((element) => {
		document.getElementById("keymap").appendChild(element);
	});
}

loadMapping();
