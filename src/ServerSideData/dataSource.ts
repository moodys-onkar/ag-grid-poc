import {
  AgGridEvent,
  IServerSideDatasource,
  IServerSideGetRowsParams,
} from "ag-grid-community";

export const datasource: IServerSideDatasource = {
  getRows(params: IServerSideGetRowsParams) {
    console.log(JSON.stringify(params.request, null, 1));

    fetch("https://jsonplaceholder.typicode.com/comments", {})
      .then((httpResponse) => httpResponse.json())
      .then((response) => {
        console.log(response);
        params.success(response);
      })
      .catch((error) => {
        console.error(error);
        params.fail();
      });
  },
};
