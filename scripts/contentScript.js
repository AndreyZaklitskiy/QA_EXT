//const numbers = ['10', '313'];
const results = [];

//let tok = document.querySelector('input[name=_token]').value;

async function parseNumbers(date = getActualDate()) {
	for(let i = 0; i < 10; i++){
		console.log('парсим магаз -', i, ', за', getActualDate());
		try {
			await axios.post('https://qa.avrora.lan/wms/init',
			{
				_token: _security_hash,
				storage_number : i,
				storage_date: date,
				camera: 3
			}).then(res => {
				console.log(res);
				return res;
			});
		}catch {
			continue;
		}
		console.log('запит надіслано.');
		try {
			await axios.get('/wms/workitems/')
			.then(res => {
				let prevData = res.data;
				console.log(res.data);//!!!!!!!!!!!!!
				const result = {
					num : i,
					qty : 0,
					lngth: prevData.length
				}
				for(let idx = 0; idx < prevData.length; idx++){
					result.qty += prevData[idx].Qty
				};
				results.push(result);
			}).then(result => {
				console.log('наступний >>>')
				window.location.replace("https://qa.avrora.lan/wms/newinvoice");
				return result;
			})
		}catch(err) {
				console.log(err);
				console.log(`не відкрилось ${i} !!!`);
				continue;
		}
	}
}
/*async function sendValues(num, date = getActualDate()) {
	axios.post('https://qa.avrora.lan/wms/init',
	{
		_token: _security_hash,
		storage_number : (num + ''),
		storage_date: date,
		camera: 3
	}).then(res => {
		console.log(res);
		return res;
	})
	
}*/

/*async function dataHandler() {
	axios.get('/wms/workitems/')
	.then(res => {
		let prevData = res.data;
		console.log(res.data);//!!!!!!!!!!!!!
		const result = {
			num : '',
			qty : 0,
			lngth: prevData.length
			// tables: [],
			// top3 : []
		}
		for(let i = 0; i < prevData.length; i++){
			result.qty += prevData[i].Qty
			if(result.tables.length > 0) {
				result.tables.forEach(e => {
					if(e !== prevData[i].usscc){
						console.log('пушим піддон - ', e)
						result.tables.push(prevData[i].usscc)
					}
				});
			} else if(result.tables.length == 0) {
				result.tables.push(prevData[i].usscc)
				console.log('пушим перший піддон - ', e)
			}
		};
	}).then(result => {
		console.log('наступний >>>')
		window.location.replace("https://qa.avrora.lan/wms/newinvoice");
		return result;
	})
}*/
/*
async function parseData() {
	const result = {
		num : numbers[i],
		qty : 0,
		lngth: prevData.length,
		tables: []
	}
	for(let i = 0; i < prevData.length;i++){
		result.qty += prevData[i].Qty
		if(result.tables.length > 0) {
			result.tables.forEach(e => {
				if(e !== prevData[i].usscc){
					console.log('пушим піддон - ', e)
					result.tables.push(prevData[i].usscc)
				}
			});
		} else if(result.tables.length == 0) {
			result.tables.push(prevData[i].usscc)
			console.log('пушим перший піддон - ', e)
		}
	};
	result.push(res);
	prevData = [];
}
*/
/*async function exit() {
	console.log('наступний >>>')
	window.location.replace("https://qa.avrora.lan/wms/newinvoice");
	// window.open("https://qa.avrora.lan/wms/newinvoice");

	//получається треба якось ін'єкцію робити js, але щоразу нову по ходу. Бо мені здається, що буде перезавантажуватись сторінка.
	//це треба перевірити.
}
*/
//як перевіряти і, як закодити, щоб все робило тіп-топ, якщо магаз не відкрився?
//по перше, пост робиться на ізі і далі, тобто перевіряти відповідь сервера про "у вас вже є активна перевірка" або,
//щось типу того, але треба розуміти. коли постиш магаз то він дає відповідь і ці відповіді треба всі варіанти обробити.
//такого магазу немає, магаз вже відкритий.

//коли немає такого магаза то чи треба виходити, чи досить відповіді сервера, шоб пробувати наступний магаз?
/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
Чтобы пропустить итерацию цикла в JavaScript, нужно воспользоваться оператором continue , 
который перейдёт из текущей итерации цикла к следующей. Он является одним из операторов "внезапного завершения".
*/


/*дод ф-ії*/

function getActualDate() {
	let date = new Date();
	let dd = date.getDate();
	if (dd < 10) dd = '0' + dd;
	let mm = date.getMonth() + 1; // месяц 1-12
	if (mm < 10) mm = '0' + mm;
	let yy = date.getFullYear();
	if (yy < 10) yy = '0' + yy;
	return dd + '.' + mm + '.' + yy;
}

/*
//-----------------
function getTop3() {
	//можливо не треба їх виносити в зону відімості дод. функцій. Таке як всплитіє тут працює.
	let AllDataArr = invoice.item;
	let DataArr;
	let topThree;

	parseAll(AllDataArr, DataArr);
	sortByQty(DataArr);
	topThree = DataArr.slice(-3);

	return topThree;
	// result = {
	// 	top3: topThree
	// }
}
console.log(result);

function parseAll(dataArray, takingArray) {
	for(let i = 0; i < dataArray.length; i++) {
		takingArray.push({prodName: dataArray[i].ProdName, qty : dataArray[i].Qty});
	}
}
function sortByQty(arr) {
	arr.sort((a, b) => a.qty > b.qty ? 1 : -1);
}
*/




//імітація кліка
/*
function fireClickEvent(element) {
    var evt = new window.MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
    });

    element.dispatchEvent(evt);
}

// this function will setup a virtual anchor element
// and fire click handler to open new URL in the same room
// it works better than location.href=something or location.reload()
function openNewURLInTheSameWindow(targetURL) {
    var a = document.createElement('a');
    a.href = targetURL;
    fireClickEvent(a);
}
*/