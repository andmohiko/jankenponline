import dayjs from 'dayjs'

import { FlexBox } from '../Base/FlexBox'

import { TableBase } from './TableBase'

import { ResultText } from '~/components/Base/ResultText'
import { JoinMatch } from '~/entities/JoinMatch'
import { ResultLabel } from '~/entities/Match'

type Props = {
  matches: Array<JoinMatch>
}

export const MatchesTable = ({ matches }: Props) => {
  const tableHead = ['日付', '対戦相手', '勝敗', 'レート変動']
  return (
    <TableBase
      header={tableHead}
      body={matches.map((m) => {
        return {
          id: m.matchId,
          item: [
            dayjs(m.updatedAt).format('YYYY/MM/DD'),
            m.opponentName,
            <ResultText key={m.matchId} result={m.result!}>
              {ResultLabel[m.result!]}
            </ResultText>,
            <ResultText key={m.matchId} result={m.result!}>
              <FlexBox align="flex-end">
                <span>{m.myAfterMatchRating}</span>
                <span
                  style={{
                    fontSize: 8,
                  }}
                >
                  {m.result! === 'win' ? '+' : '-'}
                  {m.ratingDiff}
                </span>
              </FlexBox>
            </ResultText>,
          ],
        }
      })}
    />
  )
}
