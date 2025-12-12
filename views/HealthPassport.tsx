
import React from 'react';
import { Download, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, CartesianGrid } from 'recharts';
import { HEALTH_HISTORY, WEIGHT_DATA } from '../constants';

export const HealthPassport: React.FC = () => {
  return (
    <div className="flex flex-col space-y-8 pb-24">
      {/* Header */}
      <div className="flex justify-between items-center px-2">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white transition-colors duration-300">Sağlık Pasaportu</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">Kayıtları takip et</p>
        </div>
        <button className="flex items-center space-x-2 text-primary bg-white dark:bg-slate-800 shadow-sm px-4 py-2 rounded-xl font-bold text-sm border border-gray-100 dark:border-slate-700 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-slate-700">
          <Download className="w-4 h-4" />
          <span>Dışa Aktar</span>
        </button>
      </div>

      {/* Interactive Chart */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-soft border border-gray-100 dark:border-slate-700 transition-colors duration-300">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-bold text-gray-800 dark:text-white text-lg transition-colors duration-300">Kilo Takibi</h3>
            <p className="text-xs text-gray-400 dark:text-gray-500 transition-colors duration-300">Aylık gelişim</p>
          </div>
          <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold transition-colors duration-300">
            +1.2% Artış
          </div>
        </div>

        <div className="h-[220px] w-full -ml-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={WEIGHT_DATA}>
              <defs>
                <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FB923C" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FB923C" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.5} className="dark:opacity-20" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                dy={10}
              />
              <Tooltip
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', backgroundColor: '#fff' }}
                itemStyle={{ color: '#374151' }}
                cursor={{ stroke: '#FB923C', strokeWidth: 2, strokeDasharray: '4 4' }}
              />
              <Area
                type="monotone"
                dataKey="weight"
                stroke="#FB923C"
                strokeWidth={4}
                fillOpacity={1}
                fill="url(#colorWeight)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Ticket Style Medical List */}
      <div className="px-2">
        <h3 className="font-bold text-xl text-gray-800 dark:text-white mb-4 transition-colors duration-300">Tıbbi Geçmiş</h3>
        <div className="space-y-4">
          {HEALTH_HISTORY.map((record, index) => (
            <div key={index} className="relative group">
              {/* Ticket visual */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-slate-700 flex items-center justify-between relative overflow-hidden transition-colors duration-300">
                {/* Left Cutout decoration */}
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-background dark:bg-slate-900 rounded-full transition-colors duration-300"></div>
                {/* Right Cutout decoration */}
                <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-background dark:bg-slate-900 rounded-full transition-colors duration-300"></div>

                <div className="flex items-center space-x-4 pl-2">
                  <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-slate-700 rounded-xl w-14 h-14 transition-colors duration-300">
                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase transition-colors duration-300">{record.date.split(' ')[0]}</span>
                    <span className="text-lg font-extrabold text-gray-800 dark:text-white transition-colors duration-300">{record.date.split(' ')[1]}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white text-lg transition-colors duration-300">{record.type}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">{record.details}</p>
                    <p className="text-[10px] font-bold text-primary mt-1 uppercase tracking-wide">{record.vetName}</p>
                  </div>
                </div>

                <div className="pr-2">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};