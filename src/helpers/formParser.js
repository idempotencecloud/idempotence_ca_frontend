const kebabCaseRegex = /-./g

function parseFormElements(srcElement, submittedInfo, submittedElements) {
    for(let ele of srcElement) {
        submittedInfo[ele.id.replace(kebabCaseRegex, x=>x[1].toUpperCase())] = ele.value
        submittedElements[ele.id] = ele
    }
}

export default parseFormElements