import React from "react";
import { FiX } from "react-icons/fi";
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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-lg max-h-[90vh] rounded-2xl bg-white p-4 md:p-6 shadow-xl overflow-y-auto">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              {mode === "edit" ? "Edit Employee" : "Add New Employee"}
            </h2>
            <button
              onClick={onClose}
              className="rounded-lg p-1 hover:bg-gray-100 transition-colors"
            >
              <FiX className="text-2xl text-gray-500" />
            </button>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-4 md:space-y-6 overflow-y-auto max-h-[75vh]">
            {[
              { id: "name", label: "Name", type: "text", placeholder: "Enter employee name" },
              { id: "email", label: "Email", type: "email", placeholder: "Enter employee email" },
              { id: "phone", label: "Phone", type: "text", placeholder: "Enter phone number" },
              { id: "designation", label: "Designation", type: "text", placeholder: "Enter designation" },
            ].map(({ id, label, type, placeholder }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                  {label}
                </label>
                <input
                  id={id}
                  type={type}
                  placeholder={placeholder}
                  {...formik.getFieldProps(id)}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    formik.touched[id] && formik.errors[id] ? "border-red-500" : "border-gray-200"
                  } focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none`}
                />
                {formik.touched[id] && formik.errors[id] && (
                  <p className="text-sm text-red-500 mt-1">{formik.errors[id]}</p>
                )}
              </div>
            ))}

            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select
                id="department"
                {...formik.getFieldProps("department")}
                className={`w-full px-4 py-3 rounded-xl border ${
                  formik.touched.department && formik.errors.department
                    ? "border-red-500"
                    : "border-gray-200"
                } focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none`}
              >
                <option value="">Select department</option>
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
                <option value="UI/UX">UI/UX</option>
                <option value="Finance">Finance</option>
              </select>
              {formik.touched.department && formik.errors.department && (
                <p className="text-sm text-red-500 mt-1">{formik.errors.department}</p>
              )}
            </div>

            <div>
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
                Salary
              </label>
              <input
                id="salary"
                type="number"
                min="0"
                {...formik.getFieldProps("salary")}
                className={`w-full px-4 py-3 rounded-xl border ${
                  formik.touched.salary && formik.errors.salary ? "border-red-500" : "border-gray-200"
                } focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none`}
              />
              {formik.touched.salary && formik.errors.salary && (
                <p className="text-sm text-red-500 mt-1">{formik.errors.salary}</p>
              )}
            </div>



            <div className="flex gap-3 justify-end mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 md:px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 md:px-6 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
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
