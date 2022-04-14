import react, { useState, useEffect, useRef, useMemo } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { LicenseManager } from "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {
  GridReadyEvent,
  GridApi,
  RowNode,
  RefreshCellsParams,
  GridOptions,
  GetRowNodeIdFunc,
  ITooltipParams,
  CsvExportModule,
  ColumnApi,
  ColDef,
  IAggFunc,
  IAggFuncParams,
} from "ag-grid-community";
import { products, customers } from "./constants";

LicenseManager.setLicenseKey(
  "CompanyName=Moodys,LicensedApplication=MDC,LicenseType=SingleApplication,LicensedConcurrentDeveloperCount=1,LicensedProductionInstancesCount=0,AssetReference=AG-023164,ExpiryDate=8_December_2022_[v2]_MTY3MDQ1NzYwMDAwMA==8d6ae199e65819a6993bbabdd640571b"
);

//const initialRowData = JSON.stringify(mockJson);

export const DemoGrid = () => {
  const gridRef = useRef(null);
  // const [rowData, setRowData] = useState(null);
  const [gridApi, setGridApi] = useState<GridApi>();
  const [columnApi, setColumnApi] = useState<ColumnApi>();
  const [columnVisible, setColumnVisible] = useState(true);

  const [colDefs, setColDefs] = useState([
    { field: "make" },
    { field: "model" },
    {
      field: "price",
      rowGroup: false,
      aggFunc: "myMedian",
      editable: true,
      valueParser: "Number(newValue)",
    },
  ]);

  const createData = (count: number, prefix: string) => {
    var result = [];
    for (var i = 0; i < count; i++) {
      result.push({
        make: prefix + " Athlete " + i,
        model: prefix + " Age " + i,
        price: prefix + " Country " + i,
      });
    }
    return result;
  };

  const pinnedTopRowData = useMemo(() => {
    return createData(1, "Top");
  }, []);

  const aggFuncs = {
    // this overrides the grids built-in sum function
    myMedian: (params: IAggFuncParams) => {
      const sorted = params.values.slice().sort((a, b) => a - b);
      const middle = Math.floor(sorted.length / 2);

      if (sorted.length % 2 === 0) {
        return (sorted[middle - 1] + sorted[middle]) / 2;
      }

      return sorted[middle];
    },
  };

  const products = [
    { make: "Toyota", model: "Celica", price: 1 },
    { make: "Toyota", model: "Celica", price: 2 },
    { make: "Toyota", model: "Celica", price: 3 },
    { make: "Ford", model: "Mondeo", price: 4 },
    { make: "Ford", model: "Mondeo", price: 5 },
    { make: "Porsche", model: "Boxter", price: 6 },
    { make: "Toyota", model: "Celica", price: 10 },
    { make: "Toyota", model: "Celica", price: 12 },
    { make: "Toyota", model: "Celica", price: 13 },
    { make: "Ford", model: "Mondeo", price: 14 },
    { make: "Ford", model: "Mondeo", price: 15 },
    { make: "Porsche", model: "Boxter", price: 26 },
    { make: "Toyota", model: "Celica", price: 31 },
    { make: "Toyota", model: "Celica", price: 12 },
    { make: "Toyota", model: "Celica", price: 43 },
    { make: "Ford", model: "Mondeo", price: 44 },
    { make: "Ford", model: "Mondeo", price: 55 },
    { make: "Porsche", model: "Boxter", price: 62 },
    { make: "Toyota", model: "Celica", price: 13 },
    { make: "Toyota", model: "Celica", price: 25 },
    { make: "Toyota", model: "Celica", price: 33 },
    { make: "Ford", model: "Mondeo", price: 47 },
    { make: "Ford", model: "Mondeo", price: 58 },
    { make: "Porsche", model: "Boxter", price: 69 },
    { make: "Toyota", model: "Celica", price: 13 },
    { make: "Toyota", model: "Celica", price: 22 },
    { make: "Toyota", model: "Celica", price: 34 },
    { make: "Ford", model: "Mondeo", price: 47 },
    { make: "Ford", model: "Mondeo", price: 59 },
    { make: "Porsche", model: "Boxter", price: 66 },
    { make: "Toyota", model: "Celica", price: 14 },
    { make: "Toyota", model: "Celica", price: 22 },
    { make: "Toyota", model: "Celica", price: 34 },
    { make: "Ford", model: "Mondeo", price: 46 },
    { make: "Ford", model: "Mondeo", price: 57 },
    { make: "Porsche", model: "Boxter", price: 68 },
  ];

  const [rowData, setRowData] = useState(products);

  // const checkBoxSelected = (params) => {
  //   const displayedColumns = params.columnApi.getAllDisplayedColumns();
  //   return displayedColumns[0] == params.column;
  // };

  // const [colDefs, setColDefs] = useState([
  //   { field: "id", checkboxSelection: true, headerCheckboxSelection: true },
  //   { field: "first_name" },
  //   { field: "last_name" },
  //   { field: "email" },
  //   { field: "gender" },
  //   { field: "ip_address" },
  //   { field: "city" },
  //   { field: "country" },
  // ]);

  const [value, setValue] = useState("products");

  //const [colDefs, setColDefs] = useState<ColDef[]>([]);

  const setColumns = (value: string) => {
    setValue(value);
    switch (value) {
      case "Products":
        //   setColDefs(products);
        break;
      case "Customers":
        //      setColDefs(customers);
        break;
      default:
        break;
    }
  };

  const gridApiRef = useRef<any>(null);

  // useEffect(() => {
  //   fetch(`http://localhost:3001/${value}`)
  //     .then((result) => result.json())
  //     .then((rowData) => setRowData(rowData));
  // }, [value]);

  // in onGridReady, store the api for later use
  const onGridReady = (params: GridReadyEvent) => {
    // using hooks - setGridApi/setColumnApi are returned by useState
    gridApiRef.current = params.api;
    // setColDefs(products);

    setGridApi(gridApiRef.current);
    setColumnApi(params.columnApi);
  };

  //export the grid
  const onExportClick = () => {
    gridApi?.exportDataAsCsv();
  };

  //get selected rows and print the data
  const onButtonClick = () => {
    const selectedRows = gridApiRef.current.getSelectedNodes();
    const selectedDataRows = selectedRows.map((node: any) => node.data);
    const selectedData = selectedDataRows
      .map((item: any) => `${item.first_name} ${item.last_name}`)
      .join(",");
    alert(selectedData);
  };

  useEffect(() => {
    columnApi?.setColumnVisible("firstName", columnVisible);
  }, [columnVisible]);

  const toggleColumnVisibility = () => {
    setColumnVisible(!columnVisible);
  };

  // or setState if using components

  return (
    <div style={{ width: "100%", height: "900px" }}>
      <div
        id="myGrid"
        style={{
          height: "100%",
          width: "100%",
        }}
        className="ag-theme-alpine"
      >
        <button onClick={onButtonClick}>Alert Me</button>
        <button onClick={() => onExportClick()}>Export</button>
        <button onClick={toggleColumnVisibility}>Toggle first name</button>
        <select onChange={(e) => setColumns(e.target.value)}>
          <option value="Products">Products</option>
          <option value="Customers">Customers</option>
          <option value="Accounts">Accounts</option>
        </select>
        <AgGridReact
          rowSelection="multiple"
          ref={gridApiRef}
          sideBar={false}
          aggFuncs={aggFuncs}
          pinnedTopRowData={pinnedTopRowData}
          defaultColDef={{
            sortable: true,
            filter: true,
            floatingFilter: true,
            resizable: true,
          }}
          rowData={rowData}
          columnDefs={colDefs}
          pagination={true}
          onGridReady={onGridReady}
          groupIncludeTotalFooter={true}
        ></AgGridReact>
      </div>
    </div>
  );
};
