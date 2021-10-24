import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'categories', headerName: 'Categories', width: 170 },
  { field: 'coursesName', headerName: 'Courses name', width: 470 },
  { field: 'price', headerName: 'Price', width: 170 },
];


const rows = [
  { id: 1, categories: 'PROGRAMMING', name: 'CURSO DE JAVASCRIPT' },
  // { id: 2, categories: 'PROGRAMMING', coursesName: 'CURSO DE PHYTON' },
  // { id: 3, categories: 'PROGRAMMING', coursesName: 'CURSO DE JAVA' },
  // { id: 4, categories: 'COOKING', coursesName: 'CURSO DE MILANESAS DE SOJA' },
  // { id: 5, categories: 'COOKING', coursesName: 'CURSO DE POLLO AL HORNO' },
  // { id: 6, categories: 'COOKING', coursesName: 'CURSO DE BIFE A LA CRIOLLA' },
  // { id: 7, categories: 'COOKING', coursesName: 'CURSO DE PIZZAS' },
  // { id: 8, categories: 'COOKING', coursesName: 'CURSO DE TORTAS' },
  // { id: 9, categories: 'COOKING', coursesName: 'CURSO DE BIZCOCHUELOS' },
  // { id: 10, categories: 'COOKING', coursesName: 'CURSO DE ASADOS' },
  // { id: 11, categories: 'MECANIC', coursesName: 'CURSO DE MECANICA DE AUTOS' },
];

export default function CoursesTable() {
  return (
    <div style={{ height: 400, width: '100%', background: "#EDEDED", borderRadius: "5px" }}>
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
