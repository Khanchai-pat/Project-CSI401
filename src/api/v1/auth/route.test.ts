test("test login success", async () => {
  const response = await fetch("http://localhost:9999/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        username:"emp",
        password:"admin"
    }),
  });
  expect(response.status).toBe(200);
});
