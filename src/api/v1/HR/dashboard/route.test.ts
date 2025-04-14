test("Test get dashboard data status OK", async () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzQ4ZmFhZGYxMWQ1YmM1MTE2OTI0NWUiLCJ1c2VybmFtZSI6ImhzeSIsInJvbGVzIjoiSHIiLCJzdGF0dXMiOiJpbmFjdGl2ZSIsImlhdCI6MTc0MzMyMTg4MSwiZXhwIjoxNzQzMzU3ODgxfQ.pJWZ-dACCPM77VKT8UQ63X5HPtBg1FZ4_1BTJcrL9jw";
  const response = await fetch("http://localhost:9999/dashboard/dashboard", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  expect(response.status).toBe(200);
});
