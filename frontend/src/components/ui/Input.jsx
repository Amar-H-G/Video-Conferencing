export default function Input({ label, ...props }) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium text-neutral-700">{label}</label>
      )}
      <input
        {...props}
        className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-900
                   focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}
