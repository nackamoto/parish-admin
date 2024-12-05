import UserForm from "../_components/user-form";

export default function UserFormPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
          User Registration
        </h1>
        <div className="bg-white shadow rounded-lg p-6 sm:p-8">
          <UserForm />
        </div>
      </div>
    </div>
  );
}
