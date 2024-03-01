async function createData(checkedSet) {
  const checkedList = Array.from(checkedSet);
  let pyodide = await loadPyodide();
  await pyodide.loadPackage(["micropip"]);
  await pyodide.runPythonAsync(`
      import micropip
      await micropip.install('faker')
    `);

  let pythonExecuteCode = `
  from faker import Faker
  fake = Faker('ko_KR')
  profile = {}
  `;

  for (let i = 0; i < checkedList.length; i++) {
    pythonExecuteCode += `
  profile["${checkedList[i]}"] = fake.${checkedList[i]}()
  `;
  }

  pythonExecuteCode += `
  profile
  `;

  console.log(pythonExecuteCode);
  let pythonData = await pyodide.runPythonAsync(pythonExecuteCode);

  const profile = pythonData.toJs();
  return profile;
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
