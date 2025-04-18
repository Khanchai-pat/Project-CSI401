import {checkData} from "../checkEmp/route";

describe("GET /checkEmp", () => {
  test("status 200", async () => {
    const response = await (checkData).get("http://localhost:9999/api/v1/hr/checkEmp");
    console.log(response)
    expect(response.status).toBe(200);
  });
});
