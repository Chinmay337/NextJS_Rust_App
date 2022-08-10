import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import useSWR from "swr";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { NextPage } from "next";

const fetcher = async (uri: URL) => {
  const response = await fetch(uri);
  return response.json();
};

const Booker: NextPage = () => {
  // const { user, isLoading } = useUser();
  // const { data, error } = useSWR("/api/getReservations", fetcher);

  // console.log(user);

  return (
    <div className="text-black">
      <h2>Book Appointment</h2>
      <div>Options</div>
    </div>
  );
};

export default withPageAuthRequired(Booker);
