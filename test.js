const fakeDb = {
    name: 'xujiantong',
    age: 18,
    h: 'haha'
}
const fakeDbSource = {
    name: '66',
    age: 19
}

const copyObj = Object.assign({},fakeDb, fakeDbSource)
console.log(copyObj);
