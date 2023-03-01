let data = [
    {
    "item 1":"car",
    "total": 3
    },
    {
    "item 2":"Phone",
    "total": 6
   },
   {
    "item 3":"Plane",
    "total": 9
   },
   {
    "item 3":"Plane",
    "total": 12
   }
];

// for(let i = 0; i <= data.length; i++){
//     console.log(data[i].total)
// }

let grandTotal = 0
data.forEach((i) => {
    grandTotal += i.total
})
console.log(grandTotal)
// function sumValues(objArr) {
//  return objArr.map(curr => {
//     console.log(Object.values(curr))
//    return Object.values(curr.total).reduce((prev, total) => prev += Number(total), 0)
//  });
// }

// console.log(sumValues(data));