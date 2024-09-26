"use client";
import React from "react";

export default function Page() {
  const handleLogin = () => {
    window.location.href = "/api/oauth2/auth";
  };
  return (
    <div>
      <button onClick={handleLogin}>Login to Salesforce</button>
    </div>
  );
}
