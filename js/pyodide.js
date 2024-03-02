let pyodide = null;
async function initPyodide() {
  pyodide = await loadPyodide();
  await pyodide.loadPackage(["micropip"]);
  await pyodide.runPythonAsync(`
      import micropip
      await micropip.install('faker')
    `);
}

async function createData(checkedSet, count) {
  const checkedList = Array.from(checkedSet);

  let pythonExecuteCode = `
  from faker import Faker
  fake = Faker('ko_KR')
  listObj = []
  for _ in range(${count}):
      profile = {}
  `;
  // 선택한 프로퍼티 리스트를 돌면서 faker로 데이터를 생성
  for (let i = 0; i < checkedList.length; i++) {
    pythonExecuteCode += `
      profile["${checkedList[i]}"] = fake.${checkedList[i]}()
  `;
  }
  pythonExecuteCode += `
      listObj.append(profile)
  listObj
`;

  const pythonResult = await pyodide.runPythonAsync(pythonExecuteCode);
  const jsResult = pythonResult.toJs().map((item) => Object.fromEntries(item));

  return jsResult;
}
