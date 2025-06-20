"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

type HandleSearchParamsProps = (
  key: string,
  value: string,
  options?: { enableToggle: boolean },
) => void;

type UseHandleSearchParamsProps = (
  defaultValues?: Record<string, string>,
) => HandleSearchParamsProps;

/**
 * Custom hook to handle individual search param updates.
 */
const useHandleSearchParams: UseHandleSearchParamsProps = (defaultValues) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearchParams: HandleSearchParamsProps = React.useCallback(
    (key, value, options) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value === "") {
        params.delete(key);
      } else {
        if (options?.enableToggle && params.get(key) === value) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }

      router.replace(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  React.useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      for (const [key, value] of Object.entries(defaultValues)) {
        if (searchParams.get(key) == null) {
          handleSearchParams(key, value);
        }
      }
    }
  }, [defaultValues, handleSearchParams, searchParams]);

  return handleSearchParams;
};

/**
 * Hook to update multiple search parameters at once.
 */
const useHandleMultipleSearchParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (updates: Record<string, string | null | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(updates)) {
      if (value == null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }

    router.replace(`?${params.toString()}`);
  };
};

/**
 * Hook to reset (remove) one or more search parameters.
 */
const useResetSearchParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (...keys: string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    keys.forEach((key) => params.delete(key));

    router.replace(`?${params.toString()}`);
  };
};

export {
  useHandleSearchParams,
  useHandleMultipleSearchParams,
  useResetSearchParams,
};
