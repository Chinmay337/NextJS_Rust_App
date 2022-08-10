import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { NextPage } from "next";

type Props = {
  userRole: string;
};

const Profile: NextPage<Props> = ({ userRole }: Props) => {
  const { user, error, isLoading } = useUser();

  console.log(user);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message} None</div>;

  return (
    (user && (
      <div className="flex flex-col items-center text-black ">
        <div className="font-bold">
          {userRole === "Admin" ? "Admin " : ""}User
        </div>
        <img
          className="border border-green-900"
          src={user.picture ?? ""}
          alt={user.name ?? ""}
          width={100}
          height={100}
        />
        <h2>{user.name}</h2>
        {/* <p>{user.email}</p> */}
      </div>
    )) || <div>Null</div>
  );
};

export default Profile;
