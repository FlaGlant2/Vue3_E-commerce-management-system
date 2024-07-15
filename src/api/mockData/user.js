import Mock from 'mockjs'

// 参数转对象
function param2Obj(url) {
    const search = url.split('?')[1]
    // 如果url不带参数，则退出转换返回空对象，否则将参数转换成对象
    if (!search) {
        return {}
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
        .replace(/"/g,'\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
        '"}'
    )
}

let List = []
const count = 200

for (let i = 0; i < count; i++) {
    List.push(
        Mock.mock({
            id: Mock.Random.guid(),
            name: Mock.Random.cname(),
            addr: Mock.mock('@county(true)'),
            'age|18-60': 1, 
            birth: Mock.Random.date(),
            sex: Mock.Random.integer(0, 1)
        })
    )
}
 
export default {
    getUserList: config => {
        console.log(config)
        // 解构赋值 页面以及页面内容限制有默认值
        const { name, page = 1, limit = 20} = param2Obj(config.url)
        const mockList = List.filter(user => {
            // 在List中筛选传递url中name参数一致的用户。
            if (name && user.name.indexOf(name) === -1 && user.addr.indexOf(name) === -1) {
                return false
            }
            return true
        })
        // 计算用户在哪个页面上
        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        console.log(pageList)
        return {
            code: 200,
            data: {
            count: mockList.length,
            list: pageList
            }
        }
    },

    addUser: config => {
           const { name, addr, age, birth, sex } = JSON.parse(config.body)
    console.log(JSON.parse(config.body))
    List.unshift({
      id: Mock.Random.guid(),
      name: name,
      addr: addr,
      age: age,
      birth: birth,
      sex: parseInt(sex)
    })
    return {
      code: 200,
      data: {
        message: '添加成功'
      }
    }
  },

    deleteUser: config => {
    const { id } = JSON.parse(config.body)
    if (!id) {
      return {
        code: -999,
        message: '参数不正确'
      }
    } else {
      List = List.filter(u => u.id !== id)
      return {
        code: 200,
        message: '删除成功',
      }
    }
  },

    batchremove: config => {
    let { ids } = param2Obj(config.url)
    ids = ids.split(',')
    List = List.filter(u => !ids.includes(u.id))
    return {
      code: 200,
      data: {
        message: '批量删除成功'
      }
    }
  },

    updateUser: config => {
    const { id, name, addr, age, birth, sex } = JSON.parse(config.body)
    const sex_num = parseInt(sex)
    List.some(u => {
      if (u.id === id) {
        u.name = name
        u.addr = addr
        u.age = age
        u.birth = birth
        u.sex = sex_num
        return true
      }
    })
    return {
      code: 200,
      data: {
        message: '编辑成功'
      }
    }
  }
}
