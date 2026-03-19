import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, PackageOpen } from 'lucide-react';
import { useSaleStore } from '../store/saleStore';
import { usePurchaseStore } from '../store/purchaseStore';

const AnalyticsManager = () => {
  const { sales, fetchSales, isLoading: isLoadingSales } = useSaleStore();
  const { purchases, fetchPurchases, isLoading: isLoadingPurchases } = usePurchaseStore();

  useEffect(() => {
    fetchSales();
    fetchPurchases();
  }, [fetchSales, fetchPurchases]);

  const { chartData, totalSales, totalPurchases, netProfit } = useMemo(() => {
    const salesByDay = {};
    const purchasesByDay = {};
    let tSales = 0;
    let tPurchases = 0;

    sales.forEach(sale => {
      const date = new Date(sale.createdAt || sale.date);
      // Formato local que sirva para comparar
      const dateStr = date.toLocaleDateString(); 
      
      const amount = Number(sale.total_amount) || 0;
      salesByDay[dateStr] = (salesByDay[dateStr] || 0) + amount;
      tSales += amount;
    });

    purchases.forEach(purchase => {
      const date = new Date(purchase.createdAt || purchase.date);
      const dateStr = date.toLocaleDateString();
      
      const cost = Number(purchase.total_cost) || 0;
      purchasesByDay[dateStr] = (purchasesByDay[dateStr] || 0) + cost;
      tPurchases += cost;
    });

    // Combinar y ordenar fechas
    const allDatesSet = new Set([...Object.keys(salesByDay), ...Object.keys(purchasesByDay)]);
    
    // Convertir de nuevo a Date para ordenar correctamente
    const sortedDates = Array.from(allDatesSet).sort((a, b) => {
      // Intentar una comparación de fechas simple convirtiendo partes
      const [d1, m1, y1] = a.split(/[-/]/);
      const [d2, m2, y2] = b.split(/[-/]/);
      // Esto asume formato DD/MM/YYYY o MM/DD/YYYY, lo mas seguro es crear date object
      return new Date(a) - new Date(b); 
    });

    const data = sortedDates.map(date => {
      const v = salesByDay[date] || 0;
      const c = purchasesByDay[date] || 0;
      return {
        date,
        Ventas: Number(v.toFixed(2)),
        Compras: Number(c.toFixed(2)),
        Ganancia: Number((v - c).toFixed(2))
      };
    });

    return {
      chartData: data,
      totalSales: tSales,
      totalPurchases: tPurchases,
      netProfit: tSales - tPurchases
    };
  }, [sales, purchases]);

  const isLoading = isLoadingSales || isLoadingPurchases;

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
         <h2 className="text-3xl font-bold text-white tracking-wide">
           Resumen de <span className="text-orange-500">Ganancias</span>
         </h2>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center text-orange-500">
           <svg className="animate-spin h-10 w-10 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
           </svg>
        </div>
      ) : chartData.length === 0 ? (
        <div className="bg-[#1a1a24] border border-white/10 rounded-2xl p-12 text-center shadow-xl">
           <TrendingUp size={48} className="mx-auto text-gray-500 mb-4 opacity-50" />
           <h3 className="text-xl font-medium text-white mb-2">Aún no hay datos para mostrar</h3>
           <p className="text-gray-400">Registra ventas y compras para ver el resumen financiero.</p>
        </div>
      ) : (
        <>
          {/* KPI CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-black/40 to-black/20 p-6 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <DollarSign size={80} className="text-green-500" />
              </div>
              <div className="relative z-10">
                <p className="text-sm text-gray-400 font-medium tracking-wider uppercase mb-1">Total Ventas</p>
                <p className="text-3xl font-bold text-green-400">${totalSales.toFixed(2)}</p>
                <div className="flex items-center gap-2 mt-4 text-sm text-green-500 bg-green-500/10 w-max px-2 py-1 rounded inline-flex">
                  <TrendingUp size={16} /> <span>Ingresos Brutos</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-black/40 to-black/20 p-6 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <ShoppingBag size={80} className="text-red-500" />
              </div>
              <div className="relative z-10">
                <p className="text-sm text-gray-400 font-medium tracking-wider uppercase mb-1">Total Compras</p>
                <p className="text-3xl font-bold text-red-400">${totalPurchases.toFixed(2)}</p>
                <div className="flex items-center gap-2 mt-4 text-sm text-red-500 bg-red-500/10 w-max px-2 py-1 rounded inline-flex">
                  <PackageOpen size={16} /> <span>Costos Operativos</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-orange-500/20 to-amber-500/5 p-6 rounded-2xl border border-orange-500/20 shadow-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <TrendingUp size={80} className="text-orange-500" />
              </div>
              <div className="relative z-10">
                <p className="text-sm text-orange-500/80 font-medium tracking-wider uppercase mb-1">Ganancia Neta</p>
                <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
                  ${netProfit.toFixed(2)}
                </p>
                <div className="flex items-center gap-2 mt-3 text-sm text-orange-400 bg-orange-500/10 w-max px-2 py-1 rounded inline-flex">
                  {netProfit >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />} 
                  <span>{netProfit >= 0 ? "Rentable" : "Pérdida"}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* CHARTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-[#1a1a24] border border-white/10 rounded-2xl p-6 shadow-xl"
            >
               <h3 className="text-lg font-medium text-white mb-6">Comparativa Diaria (Ventas vs Compras)</h3>
               <div className="h-[400px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                     <defs>
                       <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4}/>
                         <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                       </linearGradient>
                       <linearGradient id="colorCompras" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                         <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                       </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />
                     <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                     <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                     <Tooltip 
                       contentStyle={{ backgroundColor: '#1a1a24', borderColor: '#ffffff20', borderRadius: '12px', color: '#fff' }}
                       itemStyle={{ color: '#fff' }}
                     />
                     <Legend iconType="circle" />
                     <Area type="monotone" dataKey="Ventas" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorVentas)" />
                     <Area type="monotone" dataKey="Compras" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorCompras)" />
                   </AreaChart>
                 </ResponsiveContainer>
               </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.4 }}
               className="bg-[#1a1a24] border border-white/10 rounded-2xl p-6 shadow-xl"
            >
               <h3 className="text-lg font-medium text-white mb-6">Ganancia / Flujo de Caja</h3>
               <div className="h-[400px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                     <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />
                     <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                     <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                     <Tooltip 
                       cursor={{fill: '#ffffff05'}}
                       contentStyle={{ backgroundColor: '#1a1a24', borderColor: '#ffffff20', borderRadius: '12px', color: '#fff' }}
                     />
                     <Legend iconType="circle" />
                     <Bar dataKey="Ganancia" radius={[6, 6, 6, 6]}>
                       {
                         chartData.map((entry, index) => (
                           <cell key={`cell-${index}`} fill={entry.Ganancia >= 0 ? '#f97316' : '#ef4444'} />
                         ))
                       }
                     </Bar>
                   </BarChart>
                 </ResponsiveContainer>
               </div>
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
};

export default AnalyticsManager;
