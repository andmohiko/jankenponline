import nc from 'next-connect'

import type { NextApiRequest, NextApiResponse } from 'next'

const auth = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res) => {
    console.error(err.stack)
    res.status(500).end('Something broke!')
  },
  onNoMatch: (req, res) => {
    res.status(405).json({
      status: 405,
      message: 'Method Not Allowed',
    })
  },
}).get(async (req, res) => {
  const user = {
    createdAt: new Date(),
    currentMatch: null,
    profileImageUrl:
      'https://pbs.twimg.com/profile_images/1560882765863608320/pAVy4uJ2_400x400.jpg',
    rating: 1500,
    userId: 'andmohiko',
    username: 'いとう',
    updatedAt: new Date(),
  }

  res.status(200).json({
    status: 200,
    message: `Success auth`,
    data: user,
  })
})

export default auth
