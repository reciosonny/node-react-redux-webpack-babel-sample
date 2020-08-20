
const controller = (mongoose) => {

  const Employee = mongoose.model('Employee');

  return {
    getEmployees: async (req, res) => {


      const result = await Employee.find({});
      res.send(result);
    },
    addEmployee: async (req, res) => {

      const contextEmp = new Employee({ ...req.body });

      const result = await contextEmp.save();

      res.send(result);
    },
    updateEmployee: async (req, res) => {

      const { id } = req.params;

      const result = await Employee.findOneAndUpdate({ _id: id }, { ...req.body });

      res.send(result);
    },
    deleteEmployee: async (req, res) => {

      const { id } = req.params;

      const result = await Employee.findOneAndRemove({ _id: id });

      res.send(result);
    }

  }  
}



module.exports = controller;