import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

export default function PetTable({ row }) {
  return (
    <Table size="small" aria-label="purchases">
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Customer</TableCell>
          <TableCell align="right">Amount</TableCell>
          <TableCell align="right">Total price ($)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {row.history.map((historyRow) => (
          <TableRow key={historyRow.date}>
            <TableCell component="th" scope="row">
              {historyRow.date}
            </TableCell>
            <TableCell>{historyRow.customerId}</TableCell>
            <TableCell align="right">{historyRow.amount}</TableCell>
            <TableCell align="right">
              {Math.round(historyRow.amount * row.price * 100) / 100}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
