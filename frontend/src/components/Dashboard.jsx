import React, { useState, useEffect } from "react";
import { FiSearch, FiEdit, FiTrash, FiPlus, FiUsers, FiMoreVertical, FiPhone, FiMail } from "react-icons/fi";
import axiosInstance from "../AxiosConfig/Axiosconfig";
import EmployeeModal from "./Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [modalMode, setModalMode] = useState("add");
  const [showMobileMenu, setShowMobileMenu] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await axiosInstance.get("/all");        
        setEmployees(data.employees);
      } catch (error) {
        console.error("Error fetching employees:", error);
        toast.error("Failed to fetch employees."); 
      }
    };
    fetchEmployees();
  }, []);

  const handleOpenModal = (employee = null) => {
    setSelectedEmployee(employee);
    setModalMode(employee ? "edit" : "add");
    setModalOpen(true);
  };

  const handleSaveEmployee = async (formData) => {
    try {
      if (modalMode === "edit") {
        await axiosInstance.put("/edit", { id: selectedEmployee._id, ...formData });
        setEmployees(
          employees.map((emp) =>
            emp._id === selectedEmployee._id ? { ...emp, ...formData } : emp
          )
        );
        toast.success("Employee updated successfully!");  
      } else {
        const { data } = await axiosInstance.post("/create", formData);
        setEmployees([...employees, data.employee]);
        toast.success("Employee added successfully!");  
      }
    } catch (error) {
      console.error("Error saving employee:", error);
      toast.error("Failed to save employee.");  
    } finally {
      setModalOpen(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/delete/${id}`);
      setEmployees(employees.filter((emp) => emp._id !== id));
      toast.success("Employee deleted successfully!");  
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Failed to delete employee.");  
    }
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) &&
      (filter ? emp.department.toLowerCase() === filter.toLowerCase() : true)
  );

  const EmployeeCard = ({ emp }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold text-gray-800">{emp.name}</h3>
          <p className="text-sm text-gray-600">{emp.designation}</p>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowMobileMenu(showMobileMenu === emp._id ? null : emp._id)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <FiMoreVertical className="text-gray-600" />
          </button>
          {showMobileMenu === emp._id && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-100">
              <button onClick={() => { handleOpenModal(emp); setShowMobileMenu(null); }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <FiEdit /> Edit
              </button>
              <button onClick={() => { handleDelete(emp._id); setShowMobileMenu(null); }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2">
                <FiTrash /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
        <div>
          <p className="text-gray-500">Department</p>
          <p className="font-medium">{emp.department}</p>
        </div>
        <div>
          <p className="text-gray-500">Salary</p>
          <p className="font-medium">${emp.salary}</p>
        </div>
      </div>
      <div className="text-sm space-y-2">
        <div className="flex items-center gap-2 text-gray-600">
          <FiPhone className="text-gray-400" />
          <span>{emp.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <FiMail className="text-gray-400" />
          <span>{emp.email}</span>
        </div>
        <div className="text-gray-500">
          Joined: {new Date(emp.joiningDate).toLocaleDateString()}
        </div>
      </div>
    </div>
  )
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-2 md:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="p-4 md:p-8">
        
          <div className="flex items-center justify-center gap-3 mb-6 md:mb-12">
            <FiUsers className="text-3xl md:text-4xl text-blue-600" />
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
              Employee Dashboard
            </h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6 md:mb-8">
            <div className="flex-1">
              <div className="relative group">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search by name"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none bg-white/70 backdrop-blur-sm"
                />
              </div>
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none bg-white/70 backdrop-blur-sm cursor-pointer hover:border-blue-500"
            >
              <option value="">All Departments</option>
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="UI/UX">UI/UX</option>
            </select>
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all transform hover:scale-105 hover:shadow-lg"
            >
              <FiPlus className="text-lg" />
              <span className="hidden md:inline">Add Employee</span>
              <span className="md:hidden">Add</span>
            </button>
          </div>

         
         <div className="hidden md:block overflow-x-auto">
            {filteredEmployees.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Designation</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Department</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Phone</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Email</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Salary</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Joining Date</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredEmployees.map((emp) => (
                    <tr key={emp._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-gray-800 font-medium">{emp.name}</td>
                      <td className="px-6 py-4 text-gray-600">{emp.designation}</td>
                      <td className="px-6 py-4">{emp.department}</td>
                      <td className="px-6 py-4 text-gray-600">{emp.phone}</td>
                      <td className="px-6 py-4 text-gray-600">{emp.email}</td>
                      <td className="px-6 py-4 text-right text-gray-600">${emp.salary}</td>
                      <td className="px-6 py-4 text-right text-gray-600">{new Date(emp.joiningDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-4 justify-end">
                          <button onClick={() => handleOpenModal(emp)}
                            className="text-blue-600 hover:text-blue-800 transition-colors p-1 hover:bg-blue-50 rounded-lg">
                            <FiEdit className="text-lg" />
                          </button>
                          <button onClick={() => handleDelete(emp._id)}
                            className="text-red-600 hover:text-red-800 transition-colors p-1 hover:bg-red-50 rounded-lg">
                            <FiTrash className="text-lg" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No employees found.</p>
              </div>
            )}
          </div>

          <div className="md:hidden">
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => (
                <EmployeeCard key={emp._id} emp={emp} />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No employees found.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <EmployeeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveEmployee}
        employee={selectedEmployee}
      />

      <div id="toast-container">
        <ToastContainer />
      </div>
    </div>
  );
};

export default EmployeeDashboard;