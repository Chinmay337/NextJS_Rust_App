import React from "react";
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import useSWR from "swr";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { FormikContext, useFormik } from "formik";
import * as yup from "yup";
import Header from "../components/header";
import "bootstrap/dist/css/bootstrap.min.css";
import type { NextPage } from "next";
import Layout from "../components/Layout";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Button, TextField } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import moment from "moment";
import Link from "next/link";
import LoadingButton from "@mui/lab/LoadingButton";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";

const fetcher = async (uri: URL) => {
  const response = await fetch(uri);
  return response.json();
};
const Booker: NextPage = () => {
  const [message, setMessage] = useState(""); // This will be used to show a message if the submission is successful
  const [submitted, setSubmitted] = useState(false);
  const [serverResponse, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  let date: Date | string = new Date();
  date.setDate(date.getDate() + 1);
  // date =
  //   date.getFullYear() +
  //   "-" +
  //   date.getMonth() +
  //   "-" +
  //   Number(date.getDay() + 1);

  const formik = useFormik({
    initialValues: {
      email: user?.email?.toLowerCase() ?? "",
      first_name: "",
      last_name: "",
      birth_date: "01/01/1990",
      phone_number: "",
      appointment_date: moment(date).format(),
      messages: "",
      insurance: "",
    },
    onSubmit: async (values) => {
      setMessage("Form submitted");
      console.log(values);
      setLoading(true);
      const { appointment_date, birth_date } = values;
      const data = {
        ...values,
        appointment_date: moment(appointment_date).format(),
        birth_date: moment(birth_date).format(),
      };
      console.log(data);

      const response = await fetch(`/api/makeReservation`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(values),
      });

      if (response.status !== 200) {
        setResponse("Error");
      } else {
        setResponse("Success");
      }

      setSubmitted(true);
    },
    validationSchema: yup.object({
      first_name: yup.string().trim().required("First Name is required"),
      last_name: yup.string().trim().required("Last Name is required"),
      insurance: yup.string().trim().required("Insurance Info is required"),
      email: yup
        .string()
        .email("Must be a valid email")
        .required("Email is required"),
      messages: yup.string().trim().required("Reason of Visit is required"),
      birth_date: yup.string().trim().required("Birth Date is required"),
      phone_number: yup.string().trim().required("Phone Number is required"),
      appointment_date: yup
        .string()
        .trim()
        .required("Appointment Date is required"),
    }),
  });
  if (serverResponse === "Success") {
    return (
      <>
        <Header />
        <Layout title="success" description="success">
          <div>
            <div className="text-emerald-600  mt-10 flex  flex-col justify-center w-2/3">
              <div className="mb-6 text-xl">
                You have successfully booked your appointment!
              </div>
              <div>
                <Link href="/home">
                  <Button variant="outlined" startIcon={<ReplyAllIcon />}>
                    <a className="hover:text-blue-400 no-underline">
                      View all appointments
                    </a>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  }
  return (
    <>
      <Header />

      <Layout title="Make Appointment" description="Book an Appointment">
        <div className=" d-flex flex-column justify-content-center align-items-center m-4 mt-8">
          <div hidden={!submitted} className="alert alert-primary" role="alert">
            {message}
          </div>

          <form className="w-50" onSubmit={formik.handleSubmit}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <div className="mb-3">
                <label htmlFor="first_name" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  className="form-control"
                  placeholder="John"
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.first_name && (
                  <div className="text-danger">{formik.errors.first_name}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="last_name" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  className="form-control"
                  placeholder="Doe"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.last_name && (
                  <div className="text-danger">{formik.errors.last_name}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="birth_date" className="form-label">
                  Date of Birth
                </label>
                <br></br>
                <MobileDatePicker
                  label="DOB"
                  value={formik.values.birth_date}
                  onChange={(value) =>
                    formik.setFieldValue("birth_date", value)
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
                {formik.errors.birth_date && (
                  <div className="text-danger">{formik.errors.birth_date}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="john@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled
                />
                {formik.errors.email && (
                  <div className="text-danger">{formik.errors.email}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="phone_number" className="form-label">
                  Phone Number
                </label>
                <input
                  type="phone_number"
                  name="phone_number"
                  className="form-control"
                  placeholder="(+1) 888-999-7676"
                  value={formik.values.phone_number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.phone_number && (
                  <div className="text-danger">
                    {formik.errors.phone_number}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="appointment_date" className="form-label">
                  Appointment Date
                </label>
                <br></br>

                <DateTimePicker
                  minutesStep={15}
                  disablePast
                  label="Pick Date & Time"
                  value={formik.values.appointment_date}
                  onChange={(value) =>
                    formik.setFieldValue("appointment_date", value)
                  }
                  renderInput={(params) => <TextField {...params} />}
                />

                {formik.errors.appointment_date && (
                  <div className="text-danger">
                    {formik.errors.appointment_date}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Insurance Provider
                </label>
                <textarea
                  name="insurance"
                  className="form-control"
                  placeholder="Insurance Provider"
                  value={formik.values.insurance}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.insurance && (
                  <div className="text-danger">{formik.errors.insurance}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="messages" className="form-label">
                  Reason of Visit
                </label>
                <textarea
                  name="messages"
                  className="form-control"
                  placeholder="What is the reason of visit.."
                  value={formik.values.messages}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.messages && (
                  <div className="text-danger">{formik.errors.messages}</div>
                )}
              </div>

              <LoadingButton
                type="submit"
                loading={loading}
                variant="contained"
              >
                Book Appointment
              </LoadingButton>

              {/* <button type="submit" className="btn btn-primary">
                Send
              </button> */}
            </LocalizationProvider>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default withPageAuthRequired(Booker);
