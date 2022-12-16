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
  const userId = 'andmohiko'

  res.status(200).json({
    status: 200,
    message: `Success auth`,
    data: userId,
  })
})

export default auth
