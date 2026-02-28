export default function ProgressBar({ progress }) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 mt-2">
      <div className="h-4 bg-gray-200 rounded-full overflow-hidden border-2 border-gray-200">
        <div 
          className="h-full bg-green-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        >
          <div className="h-1 bg-green-400 w-full opacity-30"></div>
        </div>
      </div>
    </div>
  );
}