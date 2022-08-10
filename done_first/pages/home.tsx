import React from "react";
import Reservations from "../components/reservations";
import Profile from "../components/userProfile";
// import Booker from "../components/makeReservation";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Header from "../components/header";
import Layout from "../components/Layout";
import useSWR from "swr";
import AdminReservations from "../components/adminReservations";

const fetcher = async (uri: URL) => {
  const response = await fetch(uri);
  return response.json();
};

// admin username pass - chinmay@bhelke.com Adminpassdone!
function Home() {
  const { data, error, isValidating } = useSWR("/api/getRole", fetcher);

  if (isValidating) return <div>Loading...</div>;

  // console.log("role data", data, error, isValidating);

  const role = isValidating ? "" : data?.role;

  return (
    <>
      <Header />
      <Layout title="Home" description="Home Page">
        <div className="font-raleway">
          <div className="flex flex-row justify-around gap-4">
            <Profile userRole={role} />{" "}
            <div className="flex items-center align-middle justify-center">
              {role !== "Admin" && (
                <Link href="/booker">
                  <h2 className="text-black">
                    <a className="hover:text-blue-400 ">
                      <Button
                        size="large"
                        variant="outlined"
                        endIcon={<SendIcon />}
                      >
                        Book Appointment
                      </Button>
                    </a>
                  </h2>
                </Link>
              )}
            </div>
          </div>

          {role === "Admin" && (
            <>
              <h2 className="text-black flex justify-center my-4 font-bold font-raleway text-xl">
                Patient Appointments
              </h2>
              <div className="h-100">
                <AdminReservations />
              </div>
            </>
          )}
          {role !== "Admin" && (
            <>
              <h2 className="text-black flex justify-center mt-4 font-bold">
                Appointments
              </h2>
              <div className="h-100">
                <Reservations />
              </div>
            </>
          )}
        </div>
      </Layout>
    </>
  );
}

export default withPageAuthRequired(Home);
