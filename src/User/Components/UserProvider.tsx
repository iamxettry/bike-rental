"use client";

import { FormProvider, useForm } from "react-hook-form";
import { UserProfile } from "../types/userTypes";
import User from "./User";

const UserProvider = () => {
  const methods = useForm<UserProfile>({
    defaultValues: {
      id: "",
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      profile_picture: "",
      is_superuser: false,
      is_active: false,
    },
  });
  return (
    <FormProvider {...methods}>
      <User />
    </FormProvider>
  );
};

export default UserProvider;