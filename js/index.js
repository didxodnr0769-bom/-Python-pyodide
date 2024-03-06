import { initPyodide, createData } from "./pyodide.js";

const checkedSet = new Set();

/** 데이터 생성 개수 input 변경 이벤트 */
const handleChangeRows = (e) => {
  const inputValue = e.target.value;
  const newData = parseInt(inputValue.replace(/[^0-9]/g, "").slice(0, 4));
  e.target.value = newData || 0;
};

/**
 * 데이터 생성 요청
 */
const requestCreateData = () => {
  const count = parseInt(document.getElementById("rows").value);

  if (!count) {
    alert("데이터 수를 입력해주세요.");
    return;
  } else if (checkedSet.size === 0) {
    alert("데이터 유형을 선택해주세요.");
    return;
  }

  createData(checkedSet, count).then((res) => {
    const resultArea = document.querySelector(".result-area");
    resultArea.textContent = JSON.stringify(
      {
        total_count: res.length,
        result: res,
      },
      null,
      4
    );
  });
};

/**
 * 클립보드에 복사
 */
export const copyToClipboard = () => {
  const resultArea = document.querySelector(".result-area");
  const text = resultArea.textContent;
  const el = document.createElement("textarea");
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  alert("복사되었습니다.");
};

export const drawCheckboxArea = () => {
  initPyodide();
  const CHECK_LIST = [
    {
      id: "date",
      type: "String",
    },
    {
      id: "name",
      type: "String",
    },
    {
      id: "user_name",
      type: "String",
    },
    {
      id: "address",
      type: "String",
    },
    {
      id: "job",
      type: "String",
    },
    {
      id: "email",
      type: "String",
    },
    {
      id: "ssn",
      type: "String",
    },
    {
      id: "phone_number",
      type: "String",
    },
    {
      id: "company",
      type: "String",
    },
    {
      id: "catch_phrase",
      type: "String",
    },
    {
      id: "bs",
      type: "String",
    },
    {
      id: "url",
      type: "String",
    },
    {
      id: "ipv4",
      type: "String",
    },
    {
      id: "ipv6",
      type: "String",
    },
    {
      id: "user_agent",
      type: "String",
    },
    {
      id: "hex_color",
      type: "String",
    },
    {
      id: "rgb_color",
      type: "String",
    },
    {
      id: "safe_hex_color",
      type: "String",
    },
    {
      id: "safe_color_name",
      type: "String",
    },
    {
      id: "mac_address",
      type: "String",
    },
  ];

  /** 체크박스 이벤트 핸들러 */
  const handleCheck = (e, { id, type }) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      checkedSet.add(id);
      const newItem = document.createElement("tr");
      newItem.id = `tr-${id}`;
      newItem.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap">${id}</td>
        <td class="px-6 py-4 whitespace-nowrap">${type}</td>
        <td class="px-6 py-4 whitespace-nowrap"></td>
        <td class="px-6 py-4 whitespace-nowrap"></td>
        <td class="px-6 py-4 whitespace-nowrap"></td>
      `;
      document.getElementById("tbody").appendChild(newItem);
    } else {
      checkedSet.delete(id);

      const targetItem = document.getElementById(`tr-${id}`);
      targetItem.remove();
    }
  };
  const check_box_area = document.querySelector(".check-box-area");
  for (let i = 0; i < CHECK_LIST.length; i++) {
    const targetItem = CHECK_LIST[i];
    const check_box = document.createElement("div");
    check_box.classList.add("flex", "items-center");

    // input 요소 생성 - checkbox
    const input = document.createElement("input");
    input.id = targetItem.id;
    input.type = "checkbox";
    input.value = "on";

    // onchange 이벤트에 함수 연결
    input.onchange = function (e) {
      handleCheck(e, targetItem); // 여기서 handleCheck는 이벤트 처리 함수입니다.
    };

    const label = document.createElement("label");
    label.htmlFor = targetItem.id; // 'for' 속성 설정
    label.classList.add("ml-2");
    label.textContent = targetItem.id; // 텍스트 설정

    // 요소를 check_box에 추가
    check_box.appendChild(input);
    check_box.appendChild(label);

    check_box_area.appendChild(check_box);
  }
};

const main = () => {
  window.onload = drawCheckboxArea;
  const item = document.getElementById("handleChangeRows");
  console.log(item);
  document
    .getElementById("requestCreateData")
    .addEventListener("click", requestCreateData);

  document
    .getElementById("copyToClipboard")
    .addEventListener("click", copyToClipboard);

  document.getElementById("rows").addEventListener("change", (e) => {
    handleChangeRows(e);
  });
};

main();
