


async function fetchJSONAsync(url, init) {
    let response = await fetch(url, init);
    if (response.ok) {
        let json = await response.json();
        return json;
    }
    else
        throw new Error(`${response.status}: ${response.statusText}`);
}
 
async function f1() {
    // let obj = await fetchJSONAsync("https://reqres.in/api/products/3")
    let init = {
        method: "POST",
        body: '{"password": "pass" }',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    };
    let obj = await fetchJSONAsync("https://req.in/api/produ", init);
    console.log("Функция f1 выполняет действия после fetch");
    console.log(obj.data.pantone_value);
    console.log("Отработала функция f1");
}
async function f2() {
    console.log("Отработала функция f2");
}
(async function main() {
    try {
        await f1();
    }
    catch (error) {
        console.log("Ошибка");
        console.dir(error);
    }
    await f2();
})();