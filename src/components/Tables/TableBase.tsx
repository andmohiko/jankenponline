import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'

type Props = {
  header: Array<string>
  body: Array<{
    id: string
    item: Array<React.ReactNode>
  }>
}

export const TableBase = ({ header, body }: Props) => {
  return (
    <TableContainer w="full">
      <Table variant="simple">
        <Thead>
          <Tr>
            {header.map((h) => (
              <Th key={h}>{h}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {body.map((r) => (
            <Tr key={r.id}>
              {r.item.map((i) => (
                <Td key={i?.toString()}>{i}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
