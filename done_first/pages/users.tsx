import useSWR from "swr";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const fetcher = async (uri: URL) => {
  const response = await fetch(uri);
  return response.json();
};

export default withPageAuthRequired(function Products() {
  const { data, error } = useSWR("/api/products", fetcher);
  // This nees to be done for getting data from Rust API
  // This calls NExt API that in turn calls the Rust API
  // NOTE: Can handle ONLY JSON

  // if (data !== undefined) {
  console.log("Got data: ", data);
  //}

  if (error) return <div>oops... {error.message}</div>;
  if (data === undefined) return <div>Loading.2..</div>;
  return <div>{JSON.stringify(data)}</div>;
});
