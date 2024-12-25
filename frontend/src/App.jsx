import React, { useState, useEffect } from "react";
import { FiSearch, FiEdit, FiTrash, FiPlus, FiUsers, FiX, FiMoreVertical } from "react-icons/fi";
import axiosInstance from "./AxiosConfig/Axiosconfig";
import EmployeeModal from "./components/Modal";


const ActionMenu = ({ onEdit, onDelete, isOpen, setIsOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-10">
      <div className="py-1">
        <button
          onClick={onEdit}
          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <FiEdit className="mr-2" /> Edit
        </button>
        <button
          onClick={onDelete}
          className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
        >
          <FiTrash className="mr-2" /> Delete
        </button>
      </div>
    </div>
  );
};

const EmployeeDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [modalMode, setModalMode] = useState("add");
  const [openMenuId, setOpenMenuId] = useState(null);

  // Fetch employees from backend
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await axiosInstance.get("/all");
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  const handleOpenModal = (employee = null) => {
    setSelectedEmployee(employee);
    setModalMode(employee ? "edit" : "add");
    setModalOpen(true);
    setOpenMenuId(null);
  };

  const handleSaveEmployee = async (formData) => {
    try {
      if (modalMode === "edit") {
        await axiosInstance.put("/edit", { id: selectedEmployee.id, ...formData });
        setEmployees(
          employees.map((emp) =>
            emp.id === selectedEmployee.id ? { ...emp, ...formData } : emp
          )
        );
      } else {
        const { data } = await axiosInstance.post("/create", formData);
        setEmployees([...employees, data]);
      }
    } catch (error) {
      console.error("Error saving employee:", error);
    } finally {
      setModalOpen(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/delete/${id}`);
      setEmployees(employees.filter((emp) => emp.id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
    } finally {
      setOpenMenuId(null);
    }
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) &&
      (filter ? emp.department.toLowerCase() === filter.toLowerCase() : true)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-2 md:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="p-4 md:p-8">
          {/* Header Section */}
          <div className="flex items-center justify-center gap-3 mb-6 md:mb-12">
            <FiUsers className="text-3xl md:text-4xl text-blue-600" />
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
              Employee Dashboard
            </h1>
          </div>

          {/* Search and Filter Controls */}
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

          {/* Employee Table */}
          <div className="overflow-x-auto">
            {filteredEmployees.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Designation</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Department</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Salary</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Joining Date</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredEmployees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-gray-800 font-medium">{emp.name}</td>
                      <td className="px-6 py-4 text-gray-600">{emp.designation}</td>
                      <td className="px-6 py-4">{emp.department}</td>
                      <td className="px-6 py-4 text-right text-gray-600">${emp.salary}</td>
                      <td className="px-6 py-4 text-right text-gray-600">{new Date(emp.joiningDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-4 justify-end">
                          <button
                            onClick={() => handleOpenModal(emp)}
                            className="text-blue-600 hover:text-blue-800 transition-colors p-1 hover:bg-blue-50 rounded-lg"
                          >
                            <FiEdit className="text-lg" />
                          </button>
                          <button
                            onClick={() => handleDelete(emp.id)}
                            className="text-red-600 hover:text-red-800 transition-colors p-1 hover:bg-red-50 rounded-lg"
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
        </div>
      </div>

      {/* Employee Modal */}
      <EmployeeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveEmployee}
        employee={selectedEmployee}
      />
    </div>
  );
};

export default EmployeeDashboard;
