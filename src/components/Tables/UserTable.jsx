import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { TablePagination } from "@material-ui/core";
import UserRow from "./UserRow";
import * as API from "../../apis/api";

export default function UserTable(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.getAllUsers(setUsers);
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
      <TableContainer>
        <Table aria-label="collapsible user table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Full name</TableCell>
              <TableCell align="right">E-mail</TableCell>
              <TableCell align="right">Phone number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => <UserRow key={user._id} user={user} />)}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}
