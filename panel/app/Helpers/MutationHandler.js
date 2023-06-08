export function filterFields({ fields, data }) {
  return Object.keys(data)
    .filter((key) => fields.includes(key))
    .reduce((obj, key) => {
      obj[key] = data[key];
      return obj;
    }, {});
}

export async function HandleApiError(e, toast, router, translation) {
  const result = { status: false, errors: {}, res: null };

  if (e.networkError?.statusCode === "500") {
    toast(translation("server fault"));
    await router.push(`/500?url=${router.asPath}`);
  }

  if (e.networkError?.result) {
    toast(e.networkError.result.errors[0].message, { status: "error" });
  }

  if (e.graphQLErrors?.length) {
    if (e.graphQLErrors.find((item) => item.code === "401")) {
      await router.push(`/auth/login?redirect=${router.pathname}`);
    } else if (e.graphQLErrors.find((item) => item.code === 422)) {
    } else {
      toast(e.graphQLErrors[0].message, { status: "error" });
    }
  }

  if (e.graphQLErrors) result.errors = e.graphQLErrors[0];

  result.status = false;

  return result;
}
