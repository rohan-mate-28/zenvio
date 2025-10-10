export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900">
      {/* Spinning logo */}
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>

      {/* Bouncing dots using only scale + delay */}
      <div className="flex space-x-2 mb-4">
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-150"></div>
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-300"></div>
      </div>

      {/* Optional loading text */}
      <p className="text-gray-600 dark:text-gray-300 text-sm animate-pulse">
        Loading...
      </p>
    </div>
  );
}
