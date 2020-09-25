import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useSelector } from 'react-redux';

export default function Dashboard() {
  const { transactions, wallet } = useSelector((state) => state.session.user);
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Concepto</TableCell>
          <TableCell>Referencia</TableCell>
          <TableCell>Cantidad</TableCell>
          <TableCell>Fecha</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {transactions.map((tx) => (
          <TableRow
            key={tx.id}
            style={{
              backgroundColor:
                tx.originId === wallet.id ? '#fff2f2' : '#f5fff2',
            }}
          >
            <TableCell component="th" scope="row">
              {tx.description}
            </TableCell>
            <TableCell>{tx.refNumber}</TableCell>
            <TableCell>{tx.ammount}</TableCell>
            <TableCell>
              {new Date(tx.createdDate).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
