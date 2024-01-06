"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Button } from "@jecfe/react-design-system";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const { user, error, isLoading } = useUser();

  const [state, setState] = useState({
    isLoading: false,
    response: undefined,
    error: undefined,
  });

  const callApi = async () => {
    setState((previous) => ({ ...previous, isLoading: true }));

    try {
      const response = await fetch("/api/protected");
      const data = await response.json();

      setState((previous) => ({
        ...previous,
        response: data,
        error: undefined,
      }));
    } catch (error: any) {
      setState((previous) => ({ ...previous, response: undefined, error }));
    } finally {
      setState((previous) => ({ ...previous, isLoading: false }));
    }
  };

  const { isLoading: stateLoading, response, error: stateError } = state;

  useEffect(() => {
    console.log(state);
  }, [state]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <div className="space-y-4">
      <Button onClick={(e) => callApi()}>Ping API</Button>
      <div>API Response: {response ?? "No response to render"}</div>
      <div>API Error: {stateError ?? "No error to render"}</div>
    </div>
  );
}
