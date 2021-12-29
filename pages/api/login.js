import { readFile } from 'fs/promises'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const logInUser = JSON.parse(req.body)
    const usersFile = await readFile('./data/users.json')
    const users = JSON.parse(usersFile)
    const foundUser = users.find((user) => user.username === logInUser.username)
    if (!foundUser) {
      res.status(404).end()
    } else if (foundUser.password === logInUser.password) {
      console.log(logInUser)
      res.status(200).end()
    } else {
      res.status(401).json({
        message: `password for ${logInUser.username} is ${foundUser.password}`,
      })
    }
  }
}
