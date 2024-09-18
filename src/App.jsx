import { useActionState, useEffect } from "react";

function SimpleForm() {
  const initialState = (() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      const parseData = JSON.parse(storedData);
      return parseData;
    }
    return {
      username: "",
      password: "",
      confirmPassword: "",
      completed: false,
      error: null,
    };
  })();

  const [state, formAction] = useActionState((previousState, nextState) => {
    const username = nextState.username ?? previousState.username ?? "";
    const password = nextState.password ?? previousState.password ?? "";
    const confirmPassword =
      nextState.confirmPassword ?? previousState.confirmPassword ?? "";

    return {
      ...previousState,
      ...nextState,
      completed: username && password && confirmPassword,
      error: password !== confirmPassword,
    };
  }, initialState);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(state));
  }, [state]);

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    >
      <form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={state.username || ""}
            onChange={(e) => {
              formAction({ username: e.target.value });
            }}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={state.password || ""}
            onChange={(e) => {
              formAction({ password: e.target.value });
            }}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={state.confirmPassword || ""}
            onChange={(e) => {
              formAction({ confirmPassword: e.target.value });
            }}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
      </form>
      {state.completed && (
        <div style={{ marginTop: "10px" }}>
          {state.error === false && (
            <p style={{ color: "green" }}>Successful password change</p>
          )}
          {state.error && (
            <p style={{ color: "red" }}>Passwords do not match</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SimpleForm;
