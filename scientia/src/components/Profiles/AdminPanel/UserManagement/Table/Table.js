import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'Email', width: 250 },
  { field: 'firstName', headerName: 'First Name', width: 200 },
  {
    field: 'lastName',
    headerName: 'Last Name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 200
  },
];

const rows = [
  { id: "adhenin19@phoca.cz", firstName: "Alexis", lastName: "Dhenin" },
  { id: "bcarty9@amazonaws.com", firstName: "Bobbe", lastName: "Carty" },
  { id: "bespie1u@wikia.com", firstName: "Beverlee", lastName: "Churchard" },
  { id: "mcaulliere1p@tripod.com", firstName:"Mortimer", lastName: "Caulliere" },
  { id: "lbellhouse1r@independent.co.uk", firstName: "Lemmie", lastName: "Bellhouse" },
  { id: "leller14@washingtonpost.com", firstName: "Lyssa", lastName: "Eller" },
  { id: "olanceleyn@go.com", firstName: "Onfroi", lastName: "Lanceley" },
  { id: "pjennok@xinhuanet.com", firstName: "Pia", lastName: "Jenno" },
  { id: "sfriedenbach1f@harvard.edu", firstName: "Stillmann", lastName: "Friedenbach" },
  { id: "tstealy13@vimeo.com", firstName: "Stealy", lastName: "Tris" },
  { id: "ygajewski2i@berkeley.edu", firstName: "Yvette", lastName: "Gajewski" },
];

export default function UsersTable() {
  return (
    <div style={{ height: 600, width: '100%', background: "#EDEDED", borderRadius: "5px" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
