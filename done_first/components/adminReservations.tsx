import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import useSWR from "swr";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { number } from "yup";
import moment from "moment";
import { CircularProgress } from "@mui/material";
import { NextPage } from "next";
const fetcher = async (uri: URL) => {
  const response = await fetch(uri);
  return response.json();
};

type TypeAdminReservations = {
  ID: string;
  Name: string;
  Date: string;
  Reason: string;
  BirthDate: string;
  Email: string;
  ContactInfo: string;
  Provider: string;
  Messages: string;
};
const AdminReservations: NextPage = () => {
  // const { user, isLoading } = useUser();
  const { data, error } = useSWR("/api/getAllReservations", fetcher);

  // console.log("admin data", data);

  if (error)
    return (
      <div className="flex flex-col justify-center items-center mt-10">
        {" "}
        <CircularProgress color="error" />
        Error Loading Data{" "}
      </div>
    );

  if (!data)
    return (
      <div className="flex flex-col justify-center items-center mt-10">
        {" "}
        <CircularProgress color="primary" />
        Loading Patient Data{" "}
      </div>
    );

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ID", width: 90 },
    {
      field: "Name",
      headerName: "Patient Name",
      width: 200,
      sortable: false,
    },
    {
      field: "Date",
      headerName: "Appointment Date",
      width: 200,
    },
    {
      field: "Reason",
      headerName: "Reason of Visit",
      width: 150,
      sortable: false,
    },
    {
      field: "BirthDate",
      headerName: "Birth Date",

      width: 110,
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
            rows={JSON.parse(data).map((item: any, idx: number) => {
              return {
                id: idx,
                ID: idx + 1,
                Name: item.first_name + " " + item.last_name,
                Date: moment(item.appointment_date).format("MM/DD/YYYY h:mm a"),
                Reason: item.messages,
                BirthDate: moment(item.birth_date).format("MM/DD/YYYY"),
                Email: item.email,
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

export default withPageAuthRequired(AdminReservations);
