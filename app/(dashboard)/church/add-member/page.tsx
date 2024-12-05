import MembershipForm from "../_components/membership-form";

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Membership Registration
        </h1>
        <div className="bg-white shadow rounded-lg p-6 sm:p-8">
          <MembershipForm />
        </div>
      </div>
    </div>
  );
}
