function ModelSelector({ models, modelId, onChange }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-apple">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">Model Selection</h2>
      <select
        value={modelId}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {models.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name} (x{model.multiplier})
          </option>
        ))}
      </select>
    </div>
  );
}

export default ModelSelector;
