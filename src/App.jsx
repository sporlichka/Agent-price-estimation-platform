import { useMemo, useState } from 'react';
import { jsPDF } from 'jspdf';
import Header from './components/Header';
import HostingSelector from './components/HostingSelector';
import ModelSelector from './components/ModelSelector';
import ResultDisplay from './components/ResultDisplay';
import Sliders from './components/Sliders';
import { calculateLongTermProjection, calculateMonthlyCost, HOSTING, MODELS } from './logic/calculator';

function App() {
	const [modelId, setModelId] = useState(MODELS[0].id);
	const [hostingId, setHostingId] = useState(HOSTING[0].id);
	const [requests, setRequests] = useState(1000);
	const [avgTokens, setAvgTokens] = useState(1000);
	const [months, setMonths] = useState(12);
	const costs = useMemo(
		() => calculateMonthlyCost({ modelId, hostingId, requests, avgTokens }),
		[modelId, hostingId, requests, avgTokens]
	);
	const projection = useMemo(() => calculateLongTermProjection(costs.total, months, 0), [costs.total, months]);

	const selectedModel = useMemo(() => MODELS.find((model) => model.id === modelId) ?? MODELS[0], [modelId]);
	const selectedHosting = useMemo(
		() => HOSTING.find((hosting) => hosting.id === hostingId) ?? HOSTING[0],
		[hostingId]
	);

	const generatePDF = () => {
		const doc = new jsPDF();

		doc.setFontSize(16);
		doc.text('CFO Bot Price Estimation Report', 20, 20);

		doc.setFontSize(12);
		doc.text(`Model: ${selectedModel.name}`, 20, 35);
		doc.text(`Hosting: ${selectedHosting.name}`, 20, 45);
		doc.text(`Monthly Requests: ${requests.toLocaleString()}`, 20, 55);
		doc.text(`Avg Tokens per Request: ${avgTokens.toLocaleString()}`, 20, 65);
		doc.text(`Forecast Months: ${months}`, 20, 75);
		doc.text(`Model Cost: $${costs.modelCost.toFixed(2)}`, 20, 80);
		doc.text(`Hosting Cost: $${costs.hostingCost.toFixed(2)}`, 20, 90);
		doc.text(`Estimated Total Cost: $${costs.total.toFixed(2)} / month`, 20, 105);
		doc.text(`Forecast Total (${months} months): $${projection.total.toFixed(2)}`, 20, 115);

		doc.save('cfo-bot-estimation.pdf');
	};

	return (
		<div className="mx-auto max-w-4xl p-8 font-sans">
			<Header />

			<div className="mb-8 grid gap-8 md:grid-cols-2">
				<ModelSelector models={MODELS} modelId={modelId} onChange={setModelId} />
				<HostingSelector hostingOptions={HOSTING} hostingId={hostingId} onChange={setHostingId} />
			</div>

			<Sliders
				requests={requests}
				avgTokens={avgTokens}
				months={months}
				onRequestsChange={setRequests}
				onAvgTokensChange={setAvgTokens}
				onMonthsChange={setMonths}
			/>

			<ResultDisplay
				costs={costs}
				projection={projection}
				months={months}
				modelName={selectedModel.name}
				hostingName={selectedHosting.name}
				onExport={generatePDF}
			/>
		</div>
	);
}

export default App;
