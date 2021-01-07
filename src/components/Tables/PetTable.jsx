import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router-dom";

export default function PetTable(props) {
  const [pets, setPets] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (props.id) {
      props.getPetMethod(props.id, setPets);
    } else {
      props.getPetMethod(setPets);
    }
  }, [props]);

  return (
    <Table size="small" aria-label="pets">
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Pet name</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {pets.map((pet) => (
          <TableRow key={pet._id}>
            <TableCell>
              <IconButton
                aria-label="edit pet"
                onClick={() => history.push(`/pets/${pet._id}/form`)}
              >
                <EditIcon />
              </IconButton>
            </TableCell>
            <TableCell>{pet.name}</TableCell>
            <TableCell>{pet.type}</TableCell>
            <TableCell>{pet.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
