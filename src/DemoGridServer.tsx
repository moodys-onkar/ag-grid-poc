import { LicenseManager } from "ag-grid-enterprise";
import react, { useState, useEffect, useRef } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {
  GridApi,
  RowNode,
  RefreshCellsParams,
  GridOptions,
  GetRowNodeIdFunc,
  ITooltipParams,
  CsvExportModule,
  ColumnApi,
} from "ag-grid-enterprise";
import { products, customers, comments } from "./constants";
import {
  AgGridEvent,
  ColDef,
  IServerSideDatasource,
  IServerSideGetRowsParams,
} from "ag-grid-community";

LicenseManager.setLicenseKey(
  "CompanyName=Moodys,LicensedApplication=MDC,LicenseType=SingleApplication,LicensedConcurrentDeveloperCount=1,LicensedProductionInstancesCount=0,AssetReference=AG-023164,ExpiryDate=8_December_2022_[v2]_MTY3MDQ1NzYwMDAwMA==8d6ae199e65819a6993bbabdd640571b"
);

//const initialRowData = JSON.stringify(mockJson);

export const DemoGrid = () => {
  const gridRef = useRef(null);
  const [rowData, setRowData] = useState(null);
  const [gridApi, setGridApi] = useState<GridApi | undefined>();
  const [columnVisible, setColumnVisible] = useState(true);
  const [columnApi, setColumnApi] = useState<ColumnApi>();

  // const [colDefs, setColDefs] = useState([
  //   { field: "make" },
  //   { field: "model" },
  //   { field: "price" },
  // ]);

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

  const [value, setValue] = useState("comments");

  const [colDefs, setColDefs] = useState<ColDef[]>([]);

  const setColumns = (value: string) => {
    setValue(value);
    switch (value) {
      case "Products":
        setColDefs(products);
        break;
      case "Customers":
        setColDefs(customers);
        break;
      case "Comments":
        setColDefs(comments);
        break;
      default:
        break;
    }
  };

  const gridApiRef = useRef<any>(null);

  // useEffect(() => {
  //   //   fetch(`http://localhost:3001/${value}`)
  //   //     .then((result) => result.json())
  //   //     .then((rowData) => setRowData(rowData));
  //   // }, [value]);
  //   fetch(`https://jsonplaceholder.typicode.com/${value}`)
  //     .then((result) => result.json())
  //     .then((rowData) => setRowData(rowData));
  // }, [value]);

  // in onGridReady, store the api for later use
  const onGridReady = (params: AgGridEvent) => {
    // using hooks - setGridApi/setColumnApi are returned by useState
    gridApiRef.current = params.api;
    //setColDefs(products);
    setColDefs(comments);

    setGridApi(params.api);
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
    columnApi?.setColumnVisible("first_name", columnVisible);
  }, [columnVisible]);

  const toggleColumnVisibility = () => {
    setColumnVisible(!columnVisible);
  };

  // or setState if using components
  const rowModelType = "serverSide";

  const datasource: IServerSideDatasource = {
    getRows(params: IServerSideGetRowsParams) {
      params.request.startRow = 1;
      params.request.endRow = 30;
      console.log(JSON.stringify(params.request, null, 1));

      fetch("https://jsonplaceholder.typicode.com/comments", {})
        .then((httpResponse) => httpResponse.json())
        .then((response) => {
          console.log(response);
          params.success({
            rowData: response,
            rowCount: params.request.endRow,
          });
        })
        .catch((error) => {
          console.error(error);
          params.fail();
        });
    },
  };

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
          <option value="Comments">Comments</option>
        </select>
        <AgGridReact
          rowSelection="multiple"
          ref={gridApiRef}
          groupDisplayType={"groupRows"}
          defaultColDef={{
            sortable: true,
            floatingFilter: true,
            resizable: true,
          }}
          serverSideDatasource={datasource}
          columnDefs={colDefs}
          onGridReady={onGridReady}
          rowModelType={rowModelType}
        ></AgGridReact>
      </div>
    </div>
  );
};
