import * as React from "react";
import useSWR from "swr";

let useFetchCycle = (swr, options) => {
  let [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (swr.data) {
      if (options?.onSuccess) {
        options.onSuccess(swr.data);
      }
      setLoading(false);
    }
  }, [swr.data]);

  React.useEffect(() => {
    if (swr.error) {
      if (options?.onError) {
        options.onError(swr.error);
      }
      setLoading(false);
    }
  }, [swr.error]);

  return { isLoading, setLoading };
};

export function swrWithInput(contract, fetcher, options, key) {
  let swr = useSWR(
    contract.path + (key ? "/" + key : ""),
    {
      initialData: options?.initialData,
    }
  );
  let { isLoading, setLoading } = useFetchCycle(swr, options);

  return {
    ...swr,
    isLoading,
    setLoading,
    clearCache: () => {
      swr.mutate(null);
    },
    mutateWithFetcher: body => {
      setLoading(true);
      swr.mutate(fetcher(body));
    },
  };
}

export function swrGet(contract, fetcher, options, key) {
  let swr = useSWR(
    contract.path + (key ? "/" + key : ""),
    {
      initialData: options?.initialData,
    }
  );
  let { isLoading, setLoading } = useFetchCycle(swr, options);

  return {
    ...swr,
    isLoading,
    setLoading,
    clearCache: () => {
      swr.mutate(null);
    },
    mutateWithFetcher: () => {
      setLoading(true);
      swr.mutate(fetcher());
    },
  };
}