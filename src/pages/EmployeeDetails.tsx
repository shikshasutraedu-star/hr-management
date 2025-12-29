import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import { employees, type Employee } from "../ts/dummyData";

export default function EmployeeDetails() {
    const { id } = useParams();
    const [employee, setEmployee] = useState<Employee | null>(null);

    useEffect(() => {

        (async () => {
            try {
                const res = await fetch(`http://localhost:5064/api/Employee/GetById/${id}`)
                let temp=await res.json();
                temp=temp.user[0]
                temp={...temp}
                setEmployee(temp);
            } catch (e: any) {
                console.log(e.message);
            }
        })();
    }, [id]);

    const exportPdf = () => {
        if (!employee) return;
        const doc = new jsPDF();
        doc.text(`Employee Details`, 10, 10);
        doc.text(`Name: ${employee?.username}`, 10, 20);
        doc.text(`Email: ${employee?.email}`, 10, 30);
        doc.text(`Department: ${employee?.address}`, 10, 40);
        doc.text(`Salary: ${employee?.age}`, 10, 50);
        doc.save("employee-details.pdf");
    };

    if (!employee) {
        return (
            <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Employee not found</h3>
                <p className="mt-1 text-sm text-gray-500">The employee you're looking for doesn't exist.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header Card */}
            <div className="bg-gradient-to-r from-pink-50 to-amber-50 rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center text-2xl font-semibold">
                        {employee?.username.charAt(0)}
                    </div>
                    <div className="flex-1">
                        <h3 className="text-2xl font-semibold text-gray-900">{employee?.username}</h3>
                        <p className="text-gray-600 mt-1">{employee?.email}</p>
                    </div>
                    <button
                        onClick={exportPdf}
                        className="px-4 py-2 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700 transition-colors font-medium"
                    >
                        Export PDF
                    </button>
                </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="text-sm font-medium text-gray-500 mb-2">Department</div>
                    <div className="text-lg font-semibold text-gray-900">{employee?.address}</div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="text-sm font-medium text-gray-500 mb-2">Annual Salary</div>
                    <div className="text-lg font-semibold text-gray-900">${employee?.age?.toLocaleString()}</div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="text-sm font-medium text-gray-500 mb-2">Employee ID</div>
                    <div className="text-lg font-semibold text-gray-900"><img  className="w-24 h-24 object-cover" src={`${employee?.profileImage}`} alt="Image" /></div>
                </div>
            </div>

            {/* Additional Info Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <div className="text-sm font-medium text-gray-500 mb-1">Email Address</div>
                        <div className="text-gray-900">{employee?.email}</div>
                    </div>
                    <div>
                        <div className="text-sm font-medium text-gray-500 mb-1">Department Code</div>
                        <div className="text-gray-900">{employee?.address}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}