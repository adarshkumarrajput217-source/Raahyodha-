import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Calculator, MapPin, Navigation, IndianRupee, Fuel, Loader2 } from 'lucide-react';

interface TollFuelCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TollFuelCalculatorModal: React.FC<TollFuelCalculatorModalProps> = ({ isOpen, onClose }) => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [vehicleType, setVehicleType] = useState('truck_2_axle');
  const [mileage, setMileage] = useState('4');
  const [fuelPrice, setFuelPrice] = useState('90');
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    distance: number;
    duration: string;
    tollCost: number;
    fuelCost: number;
    totalCost: number;
    tollsCount: number;
  } | null>(null);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startLocation || !endLocation) return;

    setLoading(true);
    
    // Simulate API call for route and toll calculation
    setTimeout(() => {
      // Mock calculation based on locations
      const mockDistance = Math.floor(Math.random() * 800) + 200; // 200 to 1000 km
      const mockDurationHours = Math.floor(mockDistance / 50); // Avg 50km/h
      const mockDurationMins = Math.floor(Math.random() * 60);
      
      // Mock toll cost based on distance and vehicle type
      let tollMultiplier = 1;
      if (vehicleType === 'truck_3_axle') tollMultiplier = 1.5;
      if (vehicleType === 'truck_4_6_axle') tollMultiplier = 2;
      if (vehicleType === 'truck_7_plus_axle') tollMultiplier = 2.5;
      
      const mockTollCost = Math.floor(mockDistance * 1.5 * tollMultiplier);
      const mockTollsCount = Math.floor(mockDistance / 60); // Roughly 1 toll every 60km
      
      // Fuel calculation
      const fuelNeeded = mockDistance / parseFloat(mileage);
      const mockFuelCost = Math.floor(fuelNeeded * parseFloat(fuelPrice));

      setResult({
        distance: mockDistance,
        duration: `${mockDurationHours}h ${mockDurationMins}m`,
        tollCost: mockTollCost,
        fuelCost: mockFuelCost,
        totalCost: mockTollCost + mockFuelCost,
        tollsCount: mockTollsCount
      });
      
      setLoading(false);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-green-600 p-4 flex justify-between items-center text-white sticky top-0 z-10">
          <div className="flex items-center">
            <Calculator size={20} className="mr-2" />
            <h2 className="font-bold text-lg">Toll & Fuel Calculator</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition">
            <X size={20} />
          </button>
        </div>

        <div className="p-5 overflow-y-auto">
          {!result ? (
            <form onSubmit={handleCalculate} className="space-y-4">
              <div className="space-y-3 relative">
                <div className="absolute left-4 top-10 bottom-10 w-0.5 bg-slate-200 z-0"></div>
                
                <div className="relative z-10">
                  <label className="block text-xs font-medium text-slate-500 mb-1 ml-1">From</label>
                  <div className="flex items-center">
                    <div className="bg-white border-2 border-blue-500 w-3 h-3 rounded-full mr-3 z-10"></div>
                    <div className="relative flex-1">
                      <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="text" 
                        required
                        value={startLocation}
                        onChange={(e) => setStartLocation(e.target.value)}
                        placeholder="Starting City (e.g., Delhi)"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="relative z-10">
                  <label className="block text-xs font-medium text-slate-500 mb-1 ml-1">To</label>
                  <div className="flex items-center">
                    <div className="bg-red-500 border-2 border-white shadow-sm w-3 h-3 rounded-full mr-3 z-10"></div>
                    <div className="relative flex-1">
                      <Navigation size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="text" 
                        required
                        value={endLocation}
                        onChange={(e) => setEndLocation(e.target.value)}
                        placeholder="Destination City (e.g., Mumbai)"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <label className="block text-xs font-medium text-slate-500 mb-1">Vehicle Type</label>
                <select 
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="truck_2_axle">Truck (2 Axle)</option>
                  <option value="truck_3_axle">Truck (3 Axle)</option>
                  <option value="truck_4_6_axle">Truck (4-6 Axle)</option>
                  <option value="truck_7_plus_axle">Truck (7+ Axle)</option>
                  <option value="lcv">LCV / Mini Truck</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Mileage (km/l)</label>
                  <input 
                    type="number" 
                    required
                    min="1"
                    step="0.1"
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Fuel Price (₹/l)</label>
                  <input 
                    type="number" 
                    required
                    min="1"
                    value={fuelPrice}
                    onChange={(e) => setFuelPrice(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center shadow-md shadow-green-600/20 mt-6"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Calculating...
                  </>
                ) : (
                  'Calculate Trip Cost'
                )}
              </button>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-5"
            >
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                <h3 className="text-sm font-medium text-slate-500 mb-1">Estimated Total Cost</h3>
                <div className="text-3xl font-bold text-slate-900 flex items-center justify-center">
                  <IndianRupee size={24} className="mr-1" />
                  {result.totalCost.toLocaleString('en-IN')}
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  {startLocation} to {endLocation}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-orange-50 p-3 rounded-xl border border-orange-100">
                  <div className="flex items-center text-orange-600 mb-1">
                    <Navigation size={14} className="mr-1" />
                    <span className="text-xs font-semibold uppercase tracking-wide">Toll Tax</span>
                  </div>
                  <div className="text-lg font-bold text-slate-900">₹{result.tollCost.toLocaleString('en-IN')}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Approx. {result.tollsCount} Toll Plazas</div>
                </div>
                
                <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                  <div className="flex items-center text-blue-600 mb-1">
                    <Fuel size={14} className="mr-1" />
                    <span className="text-xs font-semibold uppercase tracking-wide">Fuel Cost</span>
                  </div>
                  <div className="text-lg font-bold text-slate-900">₹{result.fuelCost.toLocaleString('en-IN')}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Based on {mileage} km/l</div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 flex justify-around">
                <div className="text-center">
                  <div className="text-xs text-slate-500 mb-0.5">Distance</div>
                  <div className="font-bold text-slate-900">{result.distance} km</div>
                </div>
                <div className="w-px bg-slate-200"></div>
                <div className="text-center">
                  <div className="text-xs text-slate-500 mb-0.5">Est. Time</div>
                  <div className="font-bold text-slate-900">{result.duration}</div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 flex items-start">
                <AlertTriangle size={16} className="text-yellow-600 mr-2 shrink-0 mt-0.5" />
                <p className="text-xs text-yellow-800">
                  This is an estimated cost. Actual toll rates and fuel consumption may vary based on route taken, traffic, and vehicle condition.
                </p>
              </div>

              <button 
                onClick={() => setResult(null)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl transition"
              >
                Recalculate
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
