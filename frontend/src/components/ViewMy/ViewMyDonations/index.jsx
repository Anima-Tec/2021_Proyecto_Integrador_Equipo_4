import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";

import classes from "./ViewMyDonations.module.scss";

const ViewMyDonations = () => {
  return (
    <div className={classes["table-container"]}>
      <Table >
        <thead className={classes["table-head"]}>
          <tr>
            <th> Tipo </th>
            <th> Olla popular </th>
            <th> Fecha </th>
            <th> Dueño de olla </th>
          </tr>
        </thead>
        <tbody className={classes["table-body"]}>
          <tr>
            <td> Ejemplo </td>
            <td> Ejemplo </td>
            <td> Ejemplo </td>
            <td> Ejemplo </td>
          </tr>
          <tr>
            <td> Ejemplo </td>
            <td> Ejemplo </td>
            <td> Ejemplo </td>
            <td> Ejemplo </td>
          </tr>
          <tr>
            <td> Ejemplo </td>
            <td> Ejemplo </td>
            <td> Ejemplo </td>
            <td> Ejemplo </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default ViewMyDonations;
