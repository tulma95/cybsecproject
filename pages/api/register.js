import { readFile, writeFile } from 'fs/promises'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const registerUser = JSON.parse(req.body)
    const usersFile = await readFile('./data/users.json')
    const users = JSON.parse(usersFile)
    const found = users.find((user) => user.username === registerUser.username)
    if (!found)
      writeFile('./data/users.json', JSON.stringify(users.concat(registerUser)))

    writeFile(
      './data/users.json',
      JSON.stringify(
        users.map((user) => {
          return user.username === registerUser.username
            ? { username: user.username, password: registerUser.password }
            : user
        })
      )
    )

    res.status(200).end()
  }
}
