export function WorkspaceBackground() {
  return (
    <>
      <div className="fixed top-0 right-0 -z-10 opacity-10 pointer-events-none">
        <svg
          fill="none"
          height="600"
          viewBox="0 0 600 600"
          width="600"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="450" cy="150" fill="url(#paint0_radial)" r="150" />
          <defs>
            <radialGradient
              cx="0"
              cy="0"
              gradientTransform="translate(450 150) rotate(90) scale(150)"
              gradientUnits="userSpaceOnUse"
              id="paint0_radial"
              r="1"
            >
              <stop stopColor="#137fec" />
              <stop offset="1" stopColor="#137fec" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div className="fixed bottom-0 left-0 -z-10 opacity-10 pointer-events-none">
        <svg
          fill="none"
          height="400"
          viewBox="0 0 400 400"
          width="400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="300" fill="url(#paint1_radial)" r="200" />
          <defs>
            <radialGradient
              cx="0"
              cy="0"
              gradientTransform="translate(100 300) rotate(90) scale(200)"
              gradientUnits="userSpaceOnUse"
              id="paint1_radial"
              r="1"
            >
              <stop stopColor="#137fec" />
              <stop offset="1" stopColor="#137fec" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
