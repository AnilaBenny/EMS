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
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-6 overflow-hidden transform transition-all hover:scale-[1.02] hover:shadow-xl">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{emp.name}</h3>
            <p className="text-sm font-medium text-blue-600">{emp.designation}</p>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowMobileMenu(showMobileMenu === emp._id ? null : emp._id)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FiMoreVertical className="text-gray-600" />
            </button>
            {showMobileMenu === emp._id && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl z-50 border border-gray-100 overflow-hidden">
                <button 
                  onClick={() => { handleOpenModal(emp); setShowMobileMenu(null); }}
                  className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 flex items-center gap-2 transition-colors"
                >
                  <FiEdit className="text-blue-600" /> Edit
                </button>
                <button 
                  onClick={() => { handleDelete(emp._id); setShowMobileMenu(null); }}
                  className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                >
                  <FiTrash /> Delete
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Department</p>
            <p className="font-semibold text-gray-800">{emp.department}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Salary</p>
            <p className="font-semibold text-gray-800">${emp.salary}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-gray-600">
            <div className="bg-blue-50 p-2 rounded-full">
              <FiPhone className="text-blue-600" />
            </div>
            <span>{emp.phone}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <div className="bg-blue-50 p-2 rounded-full">
              <FiMail className="text-blue-600" />
            </div>
            <span>{emp.email}</span>
          </div>
          <div className="text-sm text-gray-500 mt-4 pt-4 border-t">
            Joined: {new Date(emp.joiningDate).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-center gap-4 mb-8 md:mb-12">
            <div className="bg-blue-100 p-3 rounded-2xl">
              <FiUsers className="text-3xl md:text-4xl text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Employee Dashboard
            </h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <div className="relative group">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search by name"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none bg-white/90 backdrop-blur-sm text-gray-700"
                />
              </div>
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-6 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none bg-white/90 backdrop-blur-sm cursor-pointer text-gray-700"
            >
              <option value="">All Departments</option>
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="UI/UX">UI/UX</option>
            </select>
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-200 active:scale-95"
            >
              <FiPlus className="text-lg" />
              <span className="hidden md:inline">Add Employee</span>
              <span className="md:hidden">Add</span>
            </button>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto rounded-xl">
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
                    <tr key={emp._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-gray-800 font-medium">{emp.name}</td>
                      <td className="px-6 py-4 text-blue-600 font-medium">{emp.designation}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                          {emp.department}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{emp.phone}</td>
                      <td className="px-6 py-4 text-gray-600">{emp.email}</td>
                      <td className="px-6 py-4 text-right font-medium">${emp.salary}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 justify-end">
                          <button 
                            onClick={() => handleOpenModal(emp)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <FiEdit className="text-lg" />
                          </button>
                          <button 
                            onClick={() => handleDelete(emp._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
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

      \
          <div className="md:hidden grid grid-cols-1 gap-6">
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

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default EmployeeDashboard;