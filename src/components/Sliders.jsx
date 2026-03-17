function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function Sliders({
  requests,
  avgTokens,
  months,
  onRequestsChange,
  onAvgTokensChange,
  onMonthsChange,
}) {
  const handleNumberChange = (nextValue, min, max, setter) => {
    if (nextValue === '') {
      setter(min);
      return;
    }

    const parsed = Number(nextValue);

    if (Number.isNaN(parsed)) {
      return;
    }

    setter(clamp(parsed, min, max));
  };

  return (
    <div className="mb-8 rounded-2xl bg-white p-6 shadow-apple">
      <h2 className="mb-6 text-xl font-semibold text-gray-800">Usage Parameters</h2>

      <div className="mb-6">
        <label className="mb-2 block font-medium text-gray-600">
          Monthly Requests: <span className="font-bold text-blue-600">{requests.toLocaleString()}</span>
        </label>
        <input
          type="range"
          min="1000"
          max="100000000"
          step="1000"
          value={requests}
          onChange={(event) => onRequestsChange(Number(event.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-blue-600"
        />
        <input
          type="number"
          min="1000"
          max="100000000"
          step="1000"
          value={requests}
          onChange={(event) => handleNumberChange(event.target.value, 1000, 100000000, onRequestsChange)}
          className="mt-3 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium text-gray-600">
          Avg Tokens per Request: <span className="font-bold text-blue-600">{avgTokens.toLocaleString()}</span>
        </label>
        <input
          type="range"
          min="100"
          max="128000"
          step="100"
          value={avgTokens}
          onChange={(event) => onAvgTokensChange(Number(event.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-blue-600"
        />
        <input
          type="number"
          min="100"
          max="128000"
          step="100"
          value={avgTokens}
          onChange={(event) => handleNumberChange(event.target.value, 100, 128000, onAvgTokensChange)}
          className="mt-3 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mt-6">
        <label className="mb-2 block font-medium text-gray-600">
          Forecast Months: <span className="font-bold text-blue-600">{months}</span>
        </label>
        <input
          type="range"
          min="1"
          max="60"
          step="1"
          value={months}
          onChange={(event) => onMonthsChange(Number(event.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-blue-600"
        />
        <input
          type="number"
          min="1"
          max="60"
          step="1"
          value={months}
          onChange={(event) => handleNumberChange(event.target.value, 1, 60, onMonthsChange)}
          className="mt-3 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}

export default Sliders;
