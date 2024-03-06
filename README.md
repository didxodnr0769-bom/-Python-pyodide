# 회차 - python + wasm

# 개요

파이썬을 개인적으로 조금씩 사용해보던 와중에 웹스터디와 접목할만한 아이디어를 찾다가

python에서 데이터 모의 생성을 위해 사용하는 `faker`라이브러리를 이용하여 Mock 데이터 생성 페이지를 만들어보면 좋을 것 같아 프로그램을 작성하였다.

<br />
# **웹 어셈블리(WebAssembly, Wasm)**

웹에서 네이티브 앱에 가까운 성능을 제공하기 위해 고안된 새로운 코드 실행 표준.

브라우저에서 실행될 수 있는 저수준 바이너리 포맷을 제공하여, 자바스크립트(JS)와 함께 또는 독립적으로 사용할 수 있다.

이를 통해 개발자는 C, C++, Rust 등 다양한 언어로 작성된 코드를 웹 어플리케이션에서 사용할 수 있게 된다.

장점으로는 **빠른 로딩 시간**과 **효율적인 실행 성능**이 있다.

<br />
# **파이오다이드(Pyodide)**

파이썬 인터프리터를 WebAssembly로 컴파일하여 브라우저에서 실행할 수 있게 만든 것.

Python은 동적 타입 언어로, 메모리 관리와 같은 일부 작업을 런타임에 처리하는 반면,

WebAssembly는 저수준, 정적 타입 언어로 컴파일된 코드를 실행하기 위한 플랫폼이다.

이러한 차이점 때문에 Python 코드를 직접 Wasm으로 컴파일하는 것보다 Python 인터프리터나 런타임 자체를 Wasm으로 컴파일하고, 이를 통해 Python 코드를 실행하는 방식이 일반적이다.

Pyodide는 Python 인터프리터를 WebAssembly(Wasm)로 컴파일한 것

<br />
# faker 라이브러리

Python에서 사용되는, 데이터 모의 생성을 위한 라이브러리.

테스트 데이터, 데이터베이스 채우기, 데이터 분석 연습, 서버 부하 테스트 등 다양한 목적으로 활용될 수 있다.

**여러 국가 및 언어**를 지원하여, 특정 지역의 실제 데이터와 유사한 데이터를 생성할 수 있다.

```json
  {
      "index": 0,
      "id": "vljnabk0g",
      "address": "대전광역시 구로구 개포78로 (수진김동)",
      "catch_phrase": "공개 키 고단계 인터페이스",
      "user_name": "jeongsu12",
      "name": "노정훈",
      "date": "1975.06.27",
      "job": "약사 및 한약사",
      "ssn": "530229-2575656",
      "company": "허김"
  },
```

# 프로젝트

## 벤치 마킹

[Mockaroo - Random Data Generator and API Mocking Tool | JSON / CSV / SQL / Excel](https://www.mockaroo.com/)

평소에 Mock 데이터를 만들 때 사용하던 사이트

필드 네임과 타입을 지정할 수 있고, 공백률, 파일 확장자 형태 ( JSON, CSV 등)을 선택 할 수 있는 기능이 많음.

사용자가 직접 데이터를 커스텀해서 사용할 수도 있는 것 같다.

## 목표

✅ 한글로된 응답 데이터를 작성한다.

✅ 응답 속성을 지정할 수 있다.

✅ 데이터 개수를 지정할 수 있다.

✅ 응답된 데이터를 복사 할 수 있는 기능을 제공한다.
