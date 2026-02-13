let filters = {
  brightness: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  contrast: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  saturation: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  hueRotate: {
    value: 0,
    min: 0,
    max: 360,
    unit: "deg",
  },
  blur: {
    value: 0,
    min: 0,
    max: 20,
    unit: "px",
  },
};

// Create floating particles
const background = document.querySelector("main");
for (let i = 0; i < 30; i++) {
  const particle = document.createElement("div");
  particle.className = "particle";
  particle.style.left = Math.random() * 100 + "%";
  particle.style.animationDuration = Math.random() * 10 + 15 + "s";
  particle.style.animationDelay = Math.random() * 5 + "s";
  background.appendChild(particle);
}

const imageCanvas = document.querySelector("#image-canvas");
const imgInput = document.querySelector("#image-input");
const canvasCtx = imageCanvas.getContext("2d");
const resetButton = document.querySelector("#reset-btn");
const downloadButton = document.querySelector("#download-btn");
const presetsContainer = document.querySelector(".presets");

let file = null;
let image = null;

const filtersContainer = document.querySelector(".filters");

function createFilterElement(name, unit = "%", value, min, max) {
  const filterContainer = document.createElement("div");
  filterContainer.classList.add("filter");

  const input = document.createElement("input");
  input.type = "range";
  input.min = min;
  input.max = max;
  input.value = value;
  input.id = name;

  const p = document.createElement("p");
  p.innerText = name;

  filterContainer.appendChild(p);
  filterContainer.appendChild(input);

  input.addEventListener("input", (e) => {
    filters[name].value = e.target.value;
    applyFilters();
  });

  return filterContainer;
}

function createFilters() {
  Object.keys(filters).forEach((key) => {
    const filterElement = createFilterElement(
      key,
      filters[key].unit,
      filters[key].value,
      filters[key].min,
      filters[key].max,
    );
    filtersContainer.appendChild(filterElement);
  });
}

createFilters()

imgInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const imagePlaceholder = document.querySelector(".placeholder");
  const box = document.querySelector(".box");
  imageCanvas.style.display = "block";
  imagePlaceholder.style.display = "none";
  box.style.border = "none";

  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = () => {
    image = img;
    imageCanvas.width = img.width;
    imageCanvas.height = img.height;
    canvasCtx.drawImage(img, 0, 0);
  };
})  

function applyFilters() {
  canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
  canvasCtx.filter =
    `brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturation.value}${filters.saturation.unit})
    hue-rotate(${filters.hueRotate.value}${filters.hueRotate.unit})
    blur(${filters.blur.value}${filters.blur.unit})
    `.trim();
  canvasCtx.drawImage(image, 0, 0);
}

resetButton.addEventListener("click", () => {
  filters = {
    brightness: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    contrast: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    saturation: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    hueRotate: {
      value: 0,
      min: 0,
      max: 360,
      unit: "deg",
    },
    blur: {
      value: 0,
      min: 0,
      max: 20,
      unit: "px",
    },
  };
  applyFilters();

  filtersContainer.innerHTML = ""
  createFilters()
});

downloadButton.addEventListener("click", () => {
  const link = document.createElement("a")
  link.download = "edited-image.png"
  link.href = imageCanvas.toDataURL()
  link.click()
})

let presets = {
  normal: {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hueRotate: 0,
    blur: 0,
  },

  drama: {
    brightness: 95,
    contrast: 140,
    saturation: 120,
    hueRotate: 0,
    blur: 0,
  },

  vintage: {
    brightness: 105,
    contrast: 90,
    saturation: 70,
    hueRotate: 350,
    blur: 1,
  },

  oldSchool: {
    brightness: 110,
    contrast: 85,
    saturation: 60,
    hueRotate: 30,
    blur: 0,
  },

  warmSunset: {
    brightness: 110,
    contrast: 110,
    saturation: 130,
    hueRotate: 330,
    blur: 0,
  },

  coolBreeze: {
    brightness: 100,
    contrast: 105,
    saturation: 90,
    hueRotate: 180,
    blur: 0,
  },

  cinematic: {
    brightness: 95,
    contrast: 125,
    saturation: 85,
    hueRotate: 10,
    blur: 0,
  },

  vividPop: {
    brightness: 110,
    contrast: 130,
    saturation: 160,
    hueRotate: 0,
    blur: 0,
  },

  noir: {
    brightness: 90,
    contrast: 150,
    saturation: 0,
    hueRotate: 0,
    blur: 0,
  },
};

Object.keys(presets).forEach(presetName => {
  const presetButton = document.createElement("button")
  presetButton.classList.add("btn")
  presetButton.innerText = presetName
  presetsContainer.appendChild(presetButton)

  presetButton.addEventListener("click", () => {
    const preset = presets[presetName]
    Object.keys(preset).forEach(filterName => {
      filters[filterName].value = preset[filterName]
    })
    applyFilters()

    filtersContainer.innerHTML=""
    createFilters()
  })
})