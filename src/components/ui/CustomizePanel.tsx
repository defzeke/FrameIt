"use client";

import { useRef, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import YellowButton from './YellowButton';

// Slider component
interface SliderProps {
	label: string;
	value: number;
	onChange: (value: number) => void;
	min?: number;
	max?: number;
	step?: number;
}

function Slider({
	label,
	value,
	onChange,
	min = 0,
	max = 100,
	step = 1
}: SliderProps) {
	return (
		<div className="mb-4">
			<label className="block text-gray-700 text-sm font-medium mb-2">
				{label}: <span className="font-mono text-gray-900">{value}{label === 'Rotate' ? '°' : '%'}</span>
			</label>
			<input
				type="range"
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={(e) => onChange(Number(e.target.value))}
				className="w-full h-2 bg-gray-200 rounded appearance-none cursor-pointer focus:outline-none slider"
				style={{ accentColor: '#333' }}
			/>
			<style jsx>{`
				input[type='range'].slider::-webkit-slider-thumb {
					appearance: none;
					width: 16px;
					height: 16px;
					background: #fff;
					border: 2px solid #333;
					border-radius: 50%;
				}
				input[type='range'].slider::-moz-range-thumb {
					width: 16px;
					height: 16px;
					background: #fff;
					border: 2px solid #333;
					border-radius: 50%;
				}
				input[type='range'].slider::-ms-thumb {
					width: 16px;
					height: 16px;
					background: #fff;
					border: 2px solid #333;
					border-radius: 50%;
				}
				input[type='range'].slider::-webkit-slider-thumb:active {
					background: #eee;
				}
				input[type='range'].slider::-moz-range-thumb:active {
					background: #eee;
				}
				input[type='range'].slider::-ms-thumb:active {
					background: #eee;
				}
			`}</style>
		</div>
	);
}

// RichTextArea component with contentEditable
interface TextAreaProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
}

function TextArea({
	value,
	onChange,
	placeholder = "Enter your caption here..."
}: TextAreaProps) {
	const editorRef = useRef<HTMLDivElement>(null);
	
	const handleInput = () => {
		if (editorRef.current) {
			onChange(editorRef.current.innerHTML);
		}
	};

	// Set initial content
	useEffect(() => {
		if (editorRef.current && value && editorRef.current.innerHTML !== value) {
			editorRef.current.innerHTML = value;
		}
	}, [value]);
	
	return (
		<div className="relative w-full">
			<div
				ref={editorRef}
				className="w-full p-2 rounded-lg border-2 border-gray-200 focus:border-blue-400 focus:outline-none text-gray-700 bg-white min-h-[120px] text-base"
				contentEditable
				suppressContentEditableWarning
				onInput={handleInput}
				style={{ whiteSpace: 'pre-wrap', position: 'relative', zIndex: 1 }}
			/>
			{(!value || value === '<br>') && (
				<div className="absolute left-0 top-0 p-2 text-gray-400 pointer-events-none select-none" style={{ zIndex: 0 }}>
					{placeholder}
				</div>
			)}
		</div>
	);
}

// Main CustomizePanel component
interface CustomizePanelProps {
	frameColor: string;
	userScale: number;
	userRotate: number;
	onScaleChange: (value: number) => void;
	onRotateChange: (value: number) => void;
	userCaption: string;
	onCaptionChange: (value: string) => void;
	isDownloading: boolean;
	onDownload: () => void;
	captionCopied: boolean;
	onCopyCaption: (text: string) => void;
	templateBy?: string;
}

export default function CustomizePanel({
	frameColor,
	userScale,
	userRotate,
	onScaleChange,
	onRotateChange,
	userCaption,
	onCaptionChange,
	isDownloading,
	onDownload,
	captionCopied,
	onCopyCaption,
	templateBy = "Original Creator"
}: CustomizePanelProps) {
	// Unicode style maps
	const unicodeMaps = {
		bold: {
			A: '𝗔', B: '𝗕', C: '𝗖', D: '𝗗', E: '𝗘', F: '𝗙', G: '𝗚', H: '𝗛', I: '𝗜', J: '𝗝', K: '𝗞', L: '𝗟', M: '𝗠', N: '𝗡', O: '𝗢', P: '𝗣', Q: '𝗤', R: '𝗥', S: '𝗦', T: '𝗧', U: '𝗨', V: '𝗩', W: '𝗪', X: '𝗫', Y: '𝗬', Z: '𝗭',
			a: '𝗮', b: '𝗯', c: '𝗰', d: '𝗱', e: '𝗲', f: '𝗳', g: '𝗴', h: '𝗵', i: '𝗶', j: '𝗷', k: '𝗸', l: '𝗹', m: '𝗺', n: '𝗻', o: '𝗼', p: '𝗽', q: '𝗾', r: '𝗿', s: '𝘀', t: '𝘁', u: '𝘂', v: '𝘃', w: '𝘄', x: '𝘅', y: '𝘆', z: '𝘇',
		} as Record<string, string>,
		italic: {
			A: '𝐴', B: '𝐵', C: '𝐶', D: '𝐷', E: '𝐸', F: '𝐹', G: '𝐺', H: '𝐻', I: '𝐼', J: '𝐽', K: '𝐾', L: '𝐿', M: '𝑀', N: '𝑁', O: '𝑂', P: '𝑃', Q: '𝑄', R: '𝑅', S: '𝑆', T: '𝑇', U: '𝑈', V: '𝑉', W: '𝑊', X: '𝑋', Y: '𝑌', Z: '𝑍',
			a: '𝑎', b: '𝑏', c: '𝑐', d: '𝑑', e: '𝑒', f: '𝑓', g: '𝑔', h: 'ℎ', i: '𝑖', j: '𝑗', k: '𝑘', l: '𝑙', m: '𝑚', n: '𝑛', o: '𝑜', p: '𝑝', q: '𝑞', r: '𝑟', s: '𝑠', t: '𝑡', u: '𝑢', v: '𝑣', w: '𝑤', x: '𝑥', y: '𝑦', z: '𝑧',
		} as Record<string, string>,
		boldItalic: {
			A: '𝑱', B: '𝑲', C: '𝑳', D: '𝑴', E: '𝑵', F: '𝑶', G: '𝑷', H: '𝑸', I: '𝑹', J: '𝑺', K: '𝑻', L: '𝑼', M: '𝑽', N: '𝑾', O: '𝑿', P: '𝒀', Q: '𝒁',
			a: '𝒂', b: '𝒃', c: '𝒄', d: '𝒅', e: '𝒆', f: '𝒇', g: '𝒈', h: '𝒉', i: '𝒊', j: '𝒋', k: '𝒌', l: '𝒍', m: '𝒎', n: '𝒏', o: '𝒐', p: '𝒑', q: '𝒒', r: '𝒓', s: '𝒔', t: '𝒕', u: '𝒖', v: '𝒗', w: '𝒘', x: '𝒙', y: '𝒚', z: '𝒛',
		} as Record<string, string>,
	};

	function convertToUnicodeStyledText(html: string) {
		const temp = document.createElement('div');
		temp.innerHTML = html;
		function walk(node: Node, style: { bold?: boolean; italic?: boolean }) {
			if (node.nodeType === Node.TEXT_NODE) {
				let text = node.textContent || '';
				if (style.bold && style.italic) {
					text = text.split('').map(c => unicodeMaps.boldItalic[c] || c).join('');
				} else if (style.bold) {
					text = text.split('').map(c => unicodeMaps.bold[c] || c).join('');
				} else if (style.italic) {
					text = text.split('').map(c => unicodeMaps.italic[c] || c).join('');
				}
				node.textContent = text;
			}
			if (node.nodeType === Node.ELEMENT_NODE) {
				const el = node as HTMLElement;
				const nextStyle = { ...style };
				if (el.tagName === 'B' || el.tagName === 'STRONG') nextStyle.bold = true;
				if (el.tagName === 'I' || el.tagName === 'EM') nextStyle.italic = true;
				Array.from(el.childNodes).forEach(child => walk(child, nextStyle));
			}
		}
		walk(temp, {});
		return temp.textContent || '';
	}

	const handleCopyCaption = () => {
		const textToCopy = convertToUnicodeStyledText(userCaption);
		onCopyCaption(textToCopy);
	};

	return (
		<div className="w-full max-w-lg">
			<div
				className="rounded-3xl shadow-2xl p-10 flex flex-col border border-gray-200"
				style={{
					background: `linear-gradient(135deg, rgba(255,255,255,0.85) 60%, ${frameColor} 100%)`,
					backdropFilter: 'blur(16px)',
					WebkitBackdropFilter: 'blur(16px)',
					boxShadow: '0 8px 32px 0 rgba(74,144,226,0.12)',
					border: '1px solid rgba(255,255,255,0.25)',
				}}
			>
				<h2 className="text-3xl font-extrabold text-gray-900 mb-6 tracking-tight drop-shadow-sm">
					Customize Frame
				</h2>

				<div className="space-y-6">
					<Slider
						label="Scale"
						value={userScale}
						onChange={onScaleChange}
						min={50}
						max={150}
						step={1}
					/>

					<Slider
						label="Rotate"
						value={userRotate}
						onChange={onRotateChange}
						min={0}
						max={360}
						step={1}
					/>
				</div>

				<div className="my-6">
					<YellowButton
						size="md"
						className={`w-full transition-all duration-200 ${isDownloading ? 'opacity-50 cursor-wait' : 'hover:scale-[1.03] hover:shadow-lg'}`}
						onClick={onDownload}
					>
						{isDownloading ? 'Downloading...' : 'Download Frame'}
					</YellowButton>
				</div>

				<div className="mb-4 relative">
					<button
						onClick={handleCopyCaption}
						className="absolute top-2 right-2 bg-white text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50 transition-all z-20 shadow"
						title="Copy caption"
						style={{ boxShadow: 'none', border: 'none' }}
					>
						{captionCopied ? (
							<Check size={16} className="text-green-600" />
						) : (
							<Copy size={16} />
						)}
					</button>
					<TextArea
						value={userCaption}
						onChange={onCaptionChange}
						placeholder="Edit caption..."
					/>
				</div>

				<div className="mt-4 p-4 bg-white/40 rounded-lg border border-gray-100">
					<p className="text-gray-700 text-sm text-center font-medium">
						Template by: <span className="font-semibold text-blue-600">{templateBy}</span>
					</p>
				</div>
			</div>
		</div>
	);
}
