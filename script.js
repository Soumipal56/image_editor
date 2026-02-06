const filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200
    },
    exposure: {
        value: 0,
        min: -100,
        max: 100
    },
    saturation: {
        value: 100,
        min: 0,
        max: 200
    },
    hueRotate: {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg"
    },
    blur: {
        value: 0,
        min: 0,
        max: 20,
        unit: "px"
    },
    grayscale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    },
    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
}

const filtersContainer = document.querySelector(".filters")

function createFilterElement(name, unit="%", value, min, max){
    const filterContainer = document.createElement("div")
    filterContainer.classList.add("filter")

    const input = document.createElement("input")
    input.type = "range"
    input.min = min
    input.max = max
    input.value = value
    input.id = name

    const p = document.createElement("p")
    p.innerText = name

    dispatchEvent.appendChild(p)
    dispatchEvent.appendChild(input)

    return filterContainer
}

Object.keys(filters).forEach(key => {
    const filterElement = createFilterElement(key, filters[key].unit, filters[key].value, filters[key].min, filters[key].max)
})