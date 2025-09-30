import { UserProfile } from "@/components/TopBar/UserProfile";
import { AppLayout } from "@/layouts/AppLayout";
import React from "react";

const page = () => {
  return (
    <AppLayout>
      <UserProfile />
    </AppLayout>
  );
};

export default page;
