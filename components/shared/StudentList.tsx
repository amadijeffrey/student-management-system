
// import { MenuItem, Menu, Table, Portal} from "@chakra-ui/react";
// import { IoEllipsisVertical } from "react-icons/io5";



// export default function StudentList({items}){
//     return (
//          <Table.Root size="sm">
//       <Table.Header>
//         <Table.Row>
//           <Table.ColumnHeader>Name</Table.ColumnHeader>
//           <Table.ColumnHeader>Reg No.</Table.ColumnHeader>
//           <Table.ColumnHeader>Major</Table.ColumnHeader>
//           <Table.ColumnHeader textAlign="end"></Table.ColumnHeader>
//         </Table.Row>
//       </Table.Header>
//       <Table.Body>
//         {items.map((item) => (
//           <Table.Row key={item.id}>
//             <Table.Cell>{item.name}</Table.Cell>
//             <Table.Cell>{item.category}</Table.Cell>
//             <Table.Cell textAlign="end">
//                <Menu.Root>
//       <Menu.Trigger asChild>
//         <IoEllipsisVertical />
//       </Menu.Trigger>
//       <Portal>
//         <Menu.Positioner>
//           <Menu.Content>
//             <Menu.Item value="new-txt">View</Menu.Item>
//             <Menu.Item value="new-file">Edit</Menu.Item>
//             <Menu.Item value="new-win">Delete</Menu.Item>
//           </Menu.Content>
//         </Menu.Positioner>
//       </Portal>
//     </Menu.Root>
//             </Table.Cell>
//           </Table.Row>
//         ))}
//       </Table.Body>
//     </Table.Root>
//     )
// }