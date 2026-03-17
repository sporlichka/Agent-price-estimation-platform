function ResultDisplay({ costs, projection, months, modelName, hostingName, onExport }) {
  return (
    <div className="relative mt-8 rounded-2xl bg-[#1D1D1F] p-8 text-center text-white shadow-apple">
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-gray-400">Estimated Total</h3>
      <p className="mb-2 text-6xl font-bold">${costs.total.toFixed(2)}</p>
      <p className="mb-4 text-xl font-normal text-gray-400">/ mo</p>

      <p className="mb-6 text-lg text-blue-300">Forecast ({months} months): ${projection.total.toFixed(2)}</p>

      <div className="mb-6 flex justify-center space-x-8 text-gray-300">
        <p>
          Model: <span className="font-medium text-white">${costs.modelCost.toFixed(2)}</span>
        </p>
        <p>
          Hosting: <span className="font-medium text-white">${costs.hostingCost.toFixed(2)}</span>
        </p>
      </div>

      <p className="text-sm text-gray-400">
        {modelName} · {hostingName}
      </p>

      <button
        onClick={onExport}
        className="mt-6 rounded-xl bg-blue-600 px-4 py-2 font-medium text-white shadow-lg transition-colors hover:bg-blue-500"
      >
        Export PDF
      </button>
    </div>
  );
}

export default ResultDisplay;
