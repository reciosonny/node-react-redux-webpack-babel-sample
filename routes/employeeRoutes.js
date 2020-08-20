
module.exports = (app, controller) => {
  const { getEmployees, addEmployee, deleteEmployee, updateEmployee } = controller;

  app.get("/api/employees", getEmployees);
  app.post("/api/employees", addEmployee);
  app.put("/api/employees/:id", updateEmployee);
  app.delete("/api/employees/:id", deleteEmployee);
};
