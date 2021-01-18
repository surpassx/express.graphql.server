const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const {buildSchema} = require('graphql')
// 基本类型 String Int Float Boolean ID(不能重复)
// [类型] 代表数组
// 参数纯涤 Int! 叹号表述参数不能为空
const schema = buildSchema(`
    type Account {
        username: String
        age: Int
        sex: String
        department: String,
        salary(city: String): Int
    }
    type Query {
        hello: String
        accountName: String
        age: Int
        getClassMates(classNo: Int!): [String]
        account(username: String): Account
    }
`)
const root = {
    hello: () => {
        return "hello GraphQL"
    },
    accountName: () => {
        return "Mickey"
    },
    age: () => {
        return 27
    },
    account: ({username}) => {
        // account(username:"Mickey") {
        //     username,
        //         age,
        //         department,
        //         sex,
        //         salary(city: "北京")
        // },
        const salary = ({city}) => {
            if (city === '北京' || city === '上海' || city === '广州' || city === '深圳') {
                return 10000
            } else {
                return 3000
            }
        }
        return {
            username: username,
            age: 18,
            sex: '男',
            department: '清华大学',
            salary
        }
    },
    getClassMates({classNo}) {
        //   getClassMates(classNo:31)
        const obj = {
            31: ['张三', '李四', '王五'],
            61: ['张da三', '李da四', '王da五'],
        }
        return obj[classNo]
    },
}

const app = express();
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}))
app.use(express.static('public'))
app.listen(3000)