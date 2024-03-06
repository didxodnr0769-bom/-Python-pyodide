let pyodide = null;
export async function initPyodide() {
  pyodide = await loadPyodide();
  await pyodide.loadPackage(["micropip"]);
  await pyodide.runPythonAsync(`
      import micropip
      await micropip.install('faker')
    `);
}

export async function createData(checkedSet, count) {
  const checkedList = Array.from(checkedSet);

  let pythonExecuteCode = `
  from faker import Faker
  import random
  fake = Faker('ko_KR')
  listObj = []
  for _ in range(${count}):
      profile = {}
  `;
  // 선택한 프로퍼티 리스트를 돌면서 faker로 데이터를 생성
  for (let i = 0; i < checkedList.length; i++) {
    const property = checkedList[i];

    // 커스텀하여 데이터를 생성할 경우 if문으로 처리
    // date는 기본 yyyy-mm-dd 형식으로 생성되므로 다른 형식으로 생성하도록 처리
    if (property === "date") {
      pythonExecuteCode += `
      profile["${property}"] = fake.${property}('%Y.%m.%d')
  `;
    }
    // phone number는 패턴이 적용되지 않아 직접 생성
    else if (property === "phone_number") {
      pythonExecuteCode += `
      profile["${property}"] = '010-'+str(random.randint(1, 9999)).zfill(4)+'-'+str(random.randint(1, 9999)).zfill(4)
  `;
    }
    // default
    else {
      pythonExecuteCode += `
      profile["${property}"] = fake.${property}()
  `;
    }
  }
  pythonExecuteCode += `
      listObj.append(profile)
  listObj
`;
  console.log("실행 파이썬 코드 : ", pythonExecuteCode);

  const pythonResult = await pyodide.runPythonAsync(pythonExecuteCode);
  const jsResult = pythonResult.toJs().map((item) => Object.fromEntries(item));

  return jsResult.map((item, idx) => {
    // 직접 JS에서 생성할 데이터 추가시
    return {
      index: idx,
      id: Math.random().toString(36).substr(2, 9),
      ...item,
    };
  });
}
