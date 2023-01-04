export type Room = {
  id: string
  code: string
  title: string
  urlImage: string
  _count: {
    participants: number
  }
  owner: {
    id: string
    name: string
  }
  participants: {
    id: string,
    totalPoints: number
    user: {
      name: string
      avatarUrl: string
    }
  }[]
  isAdm: boolean
}
