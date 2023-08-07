const kebabCaseRegex = /-./g;

function parseFormElements(target, submittedInfo, submittedElements) {
  const elements = Array.from(target.querySelectorAll('input,select,button,textarea'));
  for (let ele of elements) {
    submittedInfo[ele.id.replace(kebabCaseRegex, (x) => x[1].toUpperCase())] = ele.value;
    submittedElements[ele.id] = ele;
  }
  //   console.log(submittedInfo);
  //   console.log(submittedElements);
}

export default parseFormElements;
