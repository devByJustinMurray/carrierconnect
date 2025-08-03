import { useEffect, useRef } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { CountUp } from 'countup.js';

ChartJS.register(BarElement, CategoryScale, LinearScale);

const DashboardMetrics = () => {
  // Refs for animated counters
  const userCountRef = useRef(null);
  const activeRetailRef = useRef(null);
  const shipmentRef = useRef(null);
  const revenueRef = useRef(null);

  useEffect(() => {
    new CountUp(userCountRef.current, 3250).start();
    new CountUp(activeRetailRef.current, 146, { suffix: ' stores' }).start();
    new CountUp(shipmentRef.current, 1250).start();
    new CountUp(revenueRef.current, 6.3, { decimalPlaces: 1, prefix: '$', suffix: 'M' }).start();
  }, []);

  const chartData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Retail Revenue ($)',
        data: [1.8, 2.2, 2.6, 3.1],
        backgroundColor: 'rgb(253 224 71)',
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[rgb(15,41,60)] text-yellow-500 p-10">
      <header className="mb-10 border-b border-yellow-500 pb-4">
        <h1 className="text-4xl font-bold">📊 Logistics Command Center</h1>
        <p className="text-sm text-yellow-400 mt-2">Your all-in-one snapshot of user, retail, and brokerage performance</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* User & Retail Metrics */}
        <div className="bg-[rgb(23,54,78)] p-6 rounded shadow-inner">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p ref={userCountRef} className="text-2xl mt-2 font-bold" />
        </div>
        <div className="bg-[rgb(23,54,78)] p-6 rounded shadow-inner">
          <h3 className="text-lg font-semibold">Active Retail Locations</h3>
          <p ref={activeRetailRef} className="text-2xl mt-2 font-bold" />
        </div>

        {/* Brokerage Metrics */}
        <div className="bg-[rgb(23,54,78)] p-6 rounded shadow-inner">
          <h3 className="text-lg font-semibold">Shipments</h3>
          <p ref={shipmentRef} className="text-2xl mt-2 font-bold" />
        </div>
        <div className="bg-[rgb(23,54,78)] p-6 rounded shadow-inner">
          <h3 className="text-lg font-semibold">YTD Brokerage Revenue</h3>
          <p ref={revenueRef} className="text-2xl mt-2 font-bold" />
        </div>
      </section>

      {/* Chart Section */}
      <section className="bg-[rgb(23,54,78)] p-8 rounded shadow-inner">
        <h2 className="text-2xl font-semibold mb-4">🛍️ Retail Revenue Overview</h2>
        <Bar data={chartData} />
      </section>

      {/* Footer */}
      <footer className="mt-12 border-t border-yellow-500 pt-6 text-yellow-400 text-sm">
        <p>Dashboard updated: August 2025 — Powered by Carrier Connect</p>
      </footer>
    </main>
  );
};


export default DashboardMetrics;