const loadData = async <Type>(
  endpoint: string,
  isDebugMode: boolean
): Promise<Array<Type> | undefined> => {
  try {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");

    const response = await fetch(endpoint, {
      method: "GET",
      headers: headers,
    });

    const data: Array<Type> = await response.json();

    if (response.ok && undefined !== data && 0 !== data.length) {
      if (isDebugMode) {
        console.log(`Response fetched ${endpoint}`, data);
      }
      return data;
    }

    const e = new Error(`No data on endpoint ${endpoint}`);
    return Promise.reject(e);
  } catch (e: any) {
    return Promise.reject(new Error(e));
  }
};

export { loadData };
