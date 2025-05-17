

const Setting = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Settings</h1>
        <p className="text-gray-600">Manage your account settings here.</p>
        <div className="mt-6">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Save Changes
            </button>
        </div>
        </div>
    );
    }

export default Setting;