import './Logo.css';

export default function Logo({ size = 'md', showText = true }) {
  return (
    <div className={`logo logo--${size}`}>
      <svg
        className="logo__icon"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8b4d9" />
            <stop offset="50%" stopColor="#e91e8c" />
            <stop offset="100%" stopColor="#c2185b" />
          </linearGradient>
        </defs>
        <circle cx="40" cy="40" r="36" fill="#fff0f5" stroke="url(#logoGrad)" strokeWidth="2.5" />
        <path
          d="M28 52 Q40 58 52 52"
          stroke="url(#logoGrad)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <text
          x="40"
          y="46"
          textAnchor="middle"
          fontFamily="Cormorant Garamond, Georgia, serif"
          fontSize="32"
          fontWeight="700"
          fill="url(#logoGrad)"
        >
          S
        </text>
        <circle cx="58" cy="24" r="4" fill="#f8b4d9" opacity="0.9" />
        <circle cx="22" cy="28" r="3" fill="#e91e8c" opacity="0.6" />
      </svg>
      {showText && (
        <div className="logo__text">
          <span className="logo__brand">Sharma Makeover</span>
          <span className="logo__by">by Anushka Sharma</span>
        </div>
      )}
    </div>
  );
}
