import { ICellRendererParams } from "ag-grid-enterprise";

export const products = [
  { field: "id", checkboxSelection: true, headerCheckboxSelection: true },
  { field: "name" },
  { field: "price" },
  { field: "color" },
  { field: "details", rowGroup: true, hide: false },
  { field: "imageUrl", headerTooltip: "Image url for user" },
  { field: "name" },
  { field: "price" },
  { field: "color" },
  { field: "details" },
];

export const comments = [
  {
    field: "postId",
  },
  { field: "id" },
  { field: "name" },
  { field: "email" },
  { field: "body" },
];

// export const customers = [
//   { field: "id", checkboxSelection: true, headerCheckboxSelection: true },
//   { field: "first_name" },
//   { field: "last_name" },
//   { field: "email" },
//   { field: "gender" },
//   { field: "ip_address" },
//   { field: "city" },
//   { field: "country" },
// ];

export const customers = [
  {
    headerName: "Id",
    field: "id",
    checkboxSelection: true,
    headerCheckboxSelection: true,
  },
  {
    headerName: "Name",
    children: [
      { headerName: "First Name", field: "firstName" },
      { headerName: "Last Name", field: "lastName" },
    ],
  },

  { headerName: "CatchPhrase", field: "catchPhrase" },
  {
    headerName: "Avatar",
    field: "avatar",
    width: 100,
    cellRenderer: ({ value }: ICellRendererParams) =>
      `<img style="width:20px;height:20px" src=${value}/>`,
    filter: false,
  },
  //   {
  //     headerName: "Address",
  //     valueGetter: ({ data }) =>
  //       `${data.address.street1} ${data.address.city} ${data.address.state} ${data.address.zip}`,
  //   },

  {
    headerName: "Address",
    children: [
      { headerName: "Street", field: "address.street1" },
      { headerName: "City", field: "address.city" },
      { headerName: "State", field: "address.state" },
      { headerName: "Zip", field: "address.zip", flex: 1 },
    ],
  },
];
