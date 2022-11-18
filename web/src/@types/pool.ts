export type Pool = {
  id: string
  code: string
  title: string
  _count: {
    participants: number
  }
  owner: {
    id: string
    name: string
  }
  participants: {
    id: string,
    user: {
      name: string
      avatarUrl: string
    }
  }[]

}
