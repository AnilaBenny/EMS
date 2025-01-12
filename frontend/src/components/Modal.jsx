import React from "react";
import { FiX, FiUser, FiMail, FiPhone, FiBriefcase, FiDollarSign } from "react-icons/fi";
import { useFormik } from "formik";
import * as Yup from "yup";

const EmployeeModal = ({ isOpen, onClose, employee, onSave, mode }) => {
  const initialValues = employee || {
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    salary: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone must be a valid 10-digit number")
      .required("Phone is required"),
    designation: Yup.string().required("Designation is required"),
    department: Yup.string().required("Department is required"),
    salary: Yup.number()
      .typeError("Salary must be a number")
      .positive("Salary must be greater than zero")
      .required("Salary is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      onSave(values);
      onClose();
    },
    enableReinitialize: true,
  });

  if (!isOpen) return null;

  const InputField = ({ id, label, type, placeholder, icon: Icon }) => (
    <div className="relative">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <Icon className="w-5 h-5" />
        </div>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...formik.getFieldProps(id)}
          className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
            formik.touched[id] && formik.errors[id] 
              ? "border-red-300 bg-red-50" 
              : "border-gray-200 hover:border-blue-400"
          } focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none bg-white`}
        />
      </div>
      {formik.touched[id] && formik.errors[id] && (
        <p className="text-sm text-red-500 mt-1 ml-1">{formik.errors[id]}</p>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-lg max-h-[90vh] rounded-3xl bg-white p-6 md:p-8 shadow-2xl overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {mode === "edit" ? "Edit Employee" : "Add New Employee"}
              </h2>
              <p className="text-gray-500 mt-1">
                {mode === "edit" ? "Update employee information" : "Enter employee details"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-xl p-2 hover:bg-gray-100 transition-colors"
            >
              <FiX className="text-2xl text-gray-400 hover:text-gray-600" />
            </button>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <InputField
              id="name"
              label="Full Name"
              type="text"
              placeholder="Enter employee name"
              icon={FiUser}
            />
            <InputField
              id="email"
              label="Email Address"
              type="email"
              placeholder="Enter employee email"
              icon={FiMail}
            />
            <InputField
              id="phone"
              label="Phone Number"
              type="text"
              placeholder="Enter phone number"
              icon={FiPhone}
            />
            <InputField
              id="designation"
              label="Designation"
              type="text"
              placeholder="Enter designation"
              icon={FiBriefcase}
            />

            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <FiBriefcase className="w-5 h-5" />
                </div>
                <select
                  id="department"
                  {...formik.getFieldProps("department")}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border appearance-none bg-white ${
                    formik.touched.department && formik.errors.department
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 hover:border-blue-400"
                  } focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none`}
                >
                  <option value="">Select department</option>
                  <option value="IT">IT</option>
                  <option value="Marketing">Marketing</option>
                  <option value="UI/UX">UI/UX</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>
              {formik.touched.department && formik.errors.department && (
                <p className="text-sm text-red-500 mt-1 ml-1">{formik.errors.department}</p>
              )}
            </div>

            <div>
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-2">
                Salary
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <FiDollarSign className="w-5 h-5" />
                </div>
                <input
                  id="salary"
                  type="number"
                  min="0"
                  placeholder="Enter salary amount"
                  {...formik.getFieldProps("salary")}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                    formik.touched.salary && formik.errors.salary
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 hover:border-blue-400"
                  } focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none`}
                />
              </div>
              {formik.touched.salary && formik.errors.salary && (
                <p className="text-sm text-red-500 mt-1 ml-1">{formik.errors.salary}</p>
              )}
            </div>

            <div className="flex gap-4 justify-end mt-8">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium shadow-lg shadow-blue-100"
              >
                {mode === "edit" ? "Update" : "Add"} Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;