import { ref, toValue, watchEffect } from "vue";

export const useFetch = <T>(url: string) => {
  const data = ref<T>();
  const isLoading = ref<boolean>(false);
  const error = ref<any>();

  watchEffect(() => {
    isLoading.value = true;
    fetch(toValue(url))
      .then(async (r) => (data.value = (await r.json()) as T))
      .catch((e) => (error.value = e))
      .finally(() => (isLoading.value = false));
  });

  return { data, isLoading, error };
};
