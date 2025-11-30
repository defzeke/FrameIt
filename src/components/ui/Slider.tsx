"use client";

interface SliderProps {
	label: string;
	value: number;
	onChange: (value: number) => void;
	min?: number;
	max?: number;
	step?: number;
}

export default function Slider({
	label,
	value,
	onChange,
	min = 0,
	max = 100,
	step = 1
}: SliderProps) {
	return (
		   <div className="mb-6">
			   <label className="block text-gray-800 text-base font-semibold mb-2 tracking-wide drop-shadow-sm">
				   {label}: <span className="font-bold text-yellow-500">{value}{label === 'Rotate' ? '°' : '%'}</span>
			   </label>
			   <input
				   type="range"
				   min={min}
				   max={max}
				   step={step}
				   value={value}
				   onChange={(e) => onChange(Number(e.target.value))}
				   className="w-full h-3 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200 slider"
				   style={{ accentColor: '#FFD600' }}
			   />
		   </div>
	);
}
