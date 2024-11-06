import { User } from "./user.model";

describe("User", () => {
  it("should create an instance", () => {
    expect(new User("Test Name", "test@test.com", "password123")).toBeTruthy();
  });
});
