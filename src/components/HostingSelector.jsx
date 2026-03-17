function HostingSelector({ hostingOptions, hostingId, onChange }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-apple">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">Hosting Selection</h2>
      <select
        value={hostingId}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {hostingOptions.map((hosting) => (
          <option key={hosting.id} value={hosting.id}>
            {hosting.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default HostingSelector;
