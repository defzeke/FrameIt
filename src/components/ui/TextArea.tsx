"use client";

interface TextAreaProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	rows?: number;
}

export default function TextArea({
	value,
	onChange,
	placeholder = "Enter your caption here...",
	rows = 6
}: TextAreaProps) {
	return (
		<textarea
			value={value}
			onChange={(e) => onChange(e.target.value)}
			placeholder={placeholder}
			rows={rows}
			className="w-full p-4 rounded-lg border-2 border-gray-200 focus:border-blue-400 focus:outline-none resize-none text-gray-700 placeholder-gray-400"
		/>
	);
}
