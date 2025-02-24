export function Error({ message }) {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-red-100 p-6 rounded-lg shadow-md">
            <p className="text-red-500 text-2xl font-semibold">❌ Error</p>
            <p className="text-red-700 mt-2">{message || "Error..."}</p>
        </div>
    );
}