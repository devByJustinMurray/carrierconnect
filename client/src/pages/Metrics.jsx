import { useEffect, useRef } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { CountUp } from 'countup.js';
import { assets } from '../assets/assets';
import Header from '../components/Header';

ChartJS.register(BarElement, CategoryScale, LinearScale);

const DashboardMetrics = () => {
  // Refs for animated counters
  const userCountRef = useRef(null);
  const activeRetailRef = useRef(null);
  const shipmentRef = useRef(null);
  const revenueRef = useRef(null);
  const carrierRef = useRef(null);
  const avgLoadTimeRef = useRef(null);
  const onTimeRateRef = useRef(null);
  const milesDrivenRef = useRef(null);

  useEffect(() => {
    new CountUp(userCountRef.current, 8429).start();
    new CountUp(activeRetailRef.current, 660, { suffix: ' Miles' }).start();
    new CountUp(shipmentRef.current, 7).start();
    new CountUp(revenueRef.current, 9.3, { decimalPlaces: 1, prefix: '$', suffix: 'M' }).start();
    new CountUp(carrierRef.current, 875).start();
    new CountUp(avgLoadTimeRef.current, 12.4, { decimalPlaces: 1, suffix: ' hrs' }).start();
    new CountUp(onTimeRateRef.current, 96.2, { decimalPlaces: 1, suffix: '%' }).start();
    new CountUp(milesDrivenRef.current, 78.5, { decimalPlaces: 2, suffix: '%' }).start();
  }, []);

  const chartData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
       // label: 'Retail Revenue ($)',
        data: [155, 255, 355, 455 ],
        backgroundColor: 'rgb(253 224 71)',
      },
      {
       // label: 'Shipment Volume',
        data: [300, 400, 500, 550],
        backgroundColor: 'rgb(96 165 250)',
      },
    ],
  };

  return (
    
    <main className="min-h-screen bg-[rgb(15,41,60)] text-black p-10">
      <header className="mb-10 border-b border-yellow-400 pb-4 w-full flex justify-between items-center">
        <img src={assets.miniLogo} alt="Mini Logo" className=" sm: w-32 ml-15" />
        <h1 className="text-4xl font-bold text-yellow-400" > Logistics Command Center</h1>
      <div><Header /></div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
    
        {/* User & Retail Metrics */}
        <div className="bg-gray-200 p-6 rounded shadow-inner">
          <h3 className="text-lg font-semibold">YTD Total Shipments</h3>
          <p ref={userCountRef} className="text-2xl mt-2 font-bold" />
        </div>
        <div className="bg-gray-200 p-6 rounded shadow-inner">
          <h3 className="text-lg font-semibold">Average Miles</h3>
          <p ref={activeRetailRef} className="text-2xl mt-2 font-bold" />
        </div>

        {/* Brokerage Metrics */}
        <div className="bg-gray-200 p-6 rounded shadow-inner">
          <h3 className="text-lg font-semibold">YTD Claims</h3>
          <p ref={shipmentRef} className="text-2xl mt-2 font-bold" />
        </div>
        <div className="bg-gray-200 p-6 rounded shadow-inner">
          <h3 className="text-lg font-semibold">YTD Total Revenue</h3>
          <p ref={revenueRef} className="text-2xl mt-2 font-bold" />
        </div>

        {/* Additional Metrics */}
        <div className="bg-gray-200 p-6 rounded shadow-inner">
          <h3 className="text-lg font-semibold">Total Carriers</h3>
          <p ref={carrierRef} className="text-2xl mt-2 font-bold" />
        </div>
        <div className="bg-gray-200 p-6 rounded shadow-inner">
          <h3 className="text-lg font-semibold">Avg. Transit Time</h3>
          <p ref={avgLoadTimeRef} className="text-2xl mt-2 font-bold" />
        </div>
        <div className="bg-gray-200 p-6 rounded shadow-inner">
          <h3 className="text-lg font-semibold">On-Time Pickup Rate</h3>
          <p ref={onTimeRateRef} className="text-2xl mt-2 font-bold" />
        </div>
        <div className="bg-gray-200 p-6 rounded shadow-inner">
          <h3 className="text-lg font-semibold">On-Time Delivery Rate</h3>
          <p ref={milesDrivenRef} className="text-2xl mt-2 font-bold" />
        </div>
      </section>

      {/* Chart Section */}
      <section className="bg-gray-200 p-8 rounded shadow-inner">
        <h2 className="text-2xl font-semibold mb-4">📦 Performance Overview</h2>
        <Bar data={chartData} />
      </section>

      {/* Footer */}
      <footer className="mt-12 border-t border-yellow-400 pt-6 text-yellow-400 text-sm">
        <p>Dashboard updated: August 2025 — Powered by Carrier Connect</p>
      </footer>
    </main>
  );
};

export default DashboardMetrics;
