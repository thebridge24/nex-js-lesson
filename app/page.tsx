import React from "react";
import ClientDiscoveryForm from "./discovery/page";
import { ToastProvider } from "./components/Toast";

export default function page() {
  return (
    <ToastProvider>
      <ClientDiscoveryForm />
    </ToastProvider>
  );
}
