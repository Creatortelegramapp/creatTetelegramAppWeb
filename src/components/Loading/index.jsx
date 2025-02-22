export function Loading() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 text-lg mt-3">🔄 Loading...</p>
        </div>
    );
}

export function Error({ message }) {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-red-100 p-6 rounded-lg shadow-md">
            <p className="text-red-500 text-2xl font-semibold">❌ Error</p>
            <p className="text-red-700 mt-2">{message || "Error..."}</p>
        </div>
    );
}
