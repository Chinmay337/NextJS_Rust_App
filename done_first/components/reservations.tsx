import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import useSWR from "swr";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { number } from "yup";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";
import { NextPage } from "next";

const fetcher = async (uri: URL) => {
  const response = await fetch(uri);
  return response.json();
};

type PatientReservations = {
  ID: string;
  Date: string;
  Reason: string;
  Name: string;
  ContactInfo: string;
  Provider: string;
  Messages: string;
};
const Reservations: NextPage = () => {
  const { data, error } = useSWR("/api/getReservations", fetcher);

  // console.log(user);

  if (error)
    return (
      <div className="flex flex-col justify-center items-center mt-10">
        {" "}
        <CircularProgress color="error" />
        Error Loading Appointments{" "}
      </div>
    );

  if (!data)
    return (
      <div className="flex flex-col justify-center items-center mt-10">
        {" "}
        <CircularProgress color="primary" />
        Loading Appointments{" "}
      </div>
    );

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ID", width: 90 },
    {
      field: "Date",
      headerName: "Appointment Date",
      width: 200,
      editable: true,
    },
    {
      field: "Reason",
      headerName: "Reason of Visit",
      width: 150,
      editable: true,
    },
    {
      field: "Name",
      headerName: "Patient Name",

      width: 110,
      editable: true,
    },
    {
      field: "ContactInfo",
      headerName: "Contact Info",

      sortable: false,
      width: 160,
    },
    {
      field: "Provider",
      headerName: "Insurance Provider",

      sortable: false,
      width: 160,
    },
    {
      field: "Messages",
      headerName: "Visit Info",

      sortable: false,
      width: 160,
    },
  ];

  // const rows: Array<PatientReservations> = [
  //   // {   ID , Date,Reason,Name, ContactInfo,Provider }
  // ];
  // console.log("reservcs", data);
  return (
    <>
      {/* <div className="text-black">
        {data.map((item: any, idx: number) => (
          <div key={idx}>{JSON.stringify(item)}</div>
        ))}
      </div> */}

      <div className="flex mx-10 justify-center">
        <div style={{ minHeight: 300, width: "100%" }}>
          <DataGrid
            rows={data.map((item: any, idx: number) => {
              return {
                id: idx,
                ID: idx + 1,
                Date: moment(item.appointment_date).format("MM/DD/YYYY h:mm a"),
                Reason: item.messages,
                Name: item.first_name + " " + item.last_name,
                ContactInfo: item.phone_number,
                Provider: item.insurance,
                Messages: item.messages,
              };
            })}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection={false}
            disableSelectionOnClick
          />
        </div>
      </div>
    </>
  );
};

export default withPageAuthRequired(Reservations);
