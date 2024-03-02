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
  let result = [];
  const checkedList = Array.from(checkedSet);

  let pythonExecuteCode = `
  from faker import Faker
  fake = Faker('ko_KR')
  profile = {}
  `;

  // 선택한 프로퍼티 리스트를 돌면서 faker로 데이터를 생성
  for (let i = 0; i < checkedList.length; i++) {
    pythonExecuteCode += `
  profile["${checkedList[i]}"] = fake.${checkedList[i]}()
  `;
  }

  pythonExecuteCode += `
  profile
  `;

  for (let i = 0; i < count; i++) {
    let pythonData = await pyodide.runPythonAsync(pythonExecuteCode);

    const profile = pythonData.toJs();
    result.push(Object.fromEntries(profile));
  }
  return result;
}
// let pythonData = await pyodide.runPythonAsync(`
// from faker import Faker
// fake = Faker('ko_KR')
// profile = {}
// profile["id"] = ${1}
// profile["name"] = ${testName}
// profile["address"] = fake.address()
// profile["job"] = fake.job()
// profile["email"] = fake.email()
// profile["ssn"] = fake.ssn()
// profile["phone_number"] = fake.phone_number()
// profile["company"] = fake.company()
// profile["url"] = fake.url()
// profile["ipv4"] = fake.ipv4()
// profile["ipv6"] = fake.ipv6()
// profile["user_agent"] = fake.user_agent()
// profile["hex_color"] = fake.hex_color()
// profile["rgb_color"] = fake.rgb_color()
// profile["safe_hex_color"] = fake.safe_hex_color()
// profile["safe_color_name"] = fake.safe_color_name()
// profile
// `);
