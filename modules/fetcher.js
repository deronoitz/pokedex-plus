import QS from "query-string";


export function fetcherGet(contract) {
  let fetcher = async () => {
    let result = await fetch(contract.path, {
      method: "get",
      headers: {
        ["Content-Type"]: "application/json"
      },
    }).then((res) => res.json());
    return result
  };
  return fetcher;
}

export function fetcherWithParams(contract) {
  let fetcher = async (data) => {
    let result = await fetch(`${contract.path}${data}`, {
      method: contract.method,
      headers: {
        ["Content-Type"]: "application/json"
      },
    }).then((res) => res.json());
    return result
  };
  return fetcher;
}
