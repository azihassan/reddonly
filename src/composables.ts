import { ref, toValue, watchEffect, type Ref } from "vue";

export const useFetch = <T>(url: string | Ref<string>) => {
  const data = ref<T>();
  const isLoading = ref<boolean>(false);
  const error = ref<any>();
  const refetch = () => {
    isLoading.value = true;
    fetch(toValue(url))
      .then(async (r) => {
        data.value = (await r.json()) as T;
        error.value = "";
      })
      .catch((e) => (error.value = e))
      .finally(() => (isLoading.value = false));
  };

  watchEffect(() => {
    refetch();
  });

  return { data, isLoading, error, refetch };
};
