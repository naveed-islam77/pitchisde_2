import CookiePolicy from "@/components/PrivacyPolicy/Cookies";
import { AppLayout } from "@/layouts/AppLayout";
import React from "react";

const Cookies = () => {
  return (
    <AppLayout>
      <CookiePolicy />
    </AppLayout>
  );
};

export default Cookies;
