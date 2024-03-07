// chakra
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  TableCaption,
} from "@chakra-ui/react";

// types
import type { Article } from "@/types";

interface AdminArticlesTableProps {
  items: Article[];
}

export const AdminArticlesTable = ({ items }: AdminArticlesTableProps) => {
  const headers: string[] = [
    "Article (Author)",
    "Article's title",
    "Article's subtitle",
    "Path",
    "CreatedAt",
    "UpdatedAt",
  ];

  return (
    <TableContainer
      boxShadow="md"
      minHeight="400px"
      height="100%"
      maxHeight="600px"
      overflowY="auto"
    >
      <Table variant="striped" colorScheme="orange" size="sm">
        <TableCaption mb="10px">
          HoBom Tech Blog Article information
        </TableCaption>
        <Thead>
          <Tr>
            {headers.map((header: string) => (
              <Th key={header}>{header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item: Article) => (
            <Tr key={item.id}>
              <Td>{item.user.nickname}</Td>
              <Td>{item.title}</Td>
              <Td>{item.subtitle}</Td>
              <Td>{item.path}</Td>
              <Td>{item.createdAt.split("T")[0]}</Td>
              <Td>{item.updatedAt.split("T")[0]}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
