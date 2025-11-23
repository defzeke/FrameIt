interface CloudUploadIconProps {
    className?: string;
}

const CloudUploadIcon: React.FC<CloudUploadIconProps> = ({ className = '' }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={className}
    >
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a5 5 0 0 1 0 10H5a3 3 0 0 1-1-5.899Z" />
        <path d="M12 14v-4" />
        <path d="m9 13 3-3 3 3" />
    </svg>
);
export default CloudUploadIcon;
