const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const {buildSchema} = require('graphql')

const schema = buildSchema(`
   input AccountInput {
    name: String
    age: Int
    sex: String
    department: String
   }
   type Account {
    name: String
    age: Int
    sex: String
    department: String
   }
   type Mutation {
    createAccount(input:AccountInput):Account
    updateAccount(id:ID!,input:AccountInput):Account
   }
   type Query {
    accounts: [Account]
   }
`)
const fakeDb = {}
const root = {
    accounts() {
        let arr =[]
        for(const key in fakeDb){
            arr.push(fakeDb[key])
        }
        return arr
    },
    createAccount({input}){
        // 相当于数据库保存
        fakeDb[input.name] = input
        // 返回保存结果
        return  fakeDb[input.name]
    },
    updateAccount({id,input}){
        const updatedAccount = Object.assign({}, fakeDb[id], input);
        fakeDb[id] = updatedAccount
        return updatedAccount
    }
}

const app = express();
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}))
app.use(express.static('public'))
app.listen(3000)