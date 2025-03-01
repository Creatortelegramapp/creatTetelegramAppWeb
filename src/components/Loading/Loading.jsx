export function Loading() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 text-lg mt-3">🔄 Loading...</p>
        </div>
    );
}

