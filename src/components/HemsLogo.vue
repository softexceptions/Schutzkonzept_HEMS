<template>
  <svg
    viewBox="0 0 310 205"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="HEMS – Heinrich-Emanuel-Merck-Schule"
    role="img"
  >
    <!-- Linke Randlinie -->
    <line x1="13" y1="2" x2="13" y2="170"
          stroke="currentColor" stroke-width="1.5" />

    <!-- 4 Finger (Outline, gestaffelte Höhen) -->
    <rect x="20" y="20" width="15" height="65" rx="7.5"
          fill="none" stroke="currentColor" stroke-width="1.5" />
    <rect x="38" y="9"  width="15" height="76" rx="7.5"
          fill="none" stroke="currentColor" stroke-width="1.5" />
    <rect x="56" y="6"  width="15" height="79" rx="7.5"
          fill="none" stroke="currentColor" stroke-width="1.5" />
    <rect x="74" y="15" width="15" height="70" rx="7.5"
          fill="none" stroke="currentColor" stroke-width="1.5" />

    <!-- Handfläche (linke Kante bündig mit Randlinie) -->
    <rect x="13" y="80" width="76" height="17" rx="3"
          fill="none" stroke="currentColor" stroke-width="1.5" />

    <!-- HEMS -->
    <text
      x="13" y="168"
      font-family="Arial Black, Arial, Helvetica, sans-serif"
      font-weight="900"
      font-size="88"
      fill="#F5921E"
    >HEMS</text>

    <!-- Heinrich-Emanuel-Merck-Schule -->
    <text
      x="13" y="186"
      font-family="Arial, Helvetica, sans-serif"
      font-weight="700"
      font-size="15"
      fill="currentColor"
    >Heinrich-Emanuel-Merck-Schule</text>

    <!-- Darmstadt -->
    <text
      x="13" y="201"
      font-family="Arial, Helvetica, sans-serif"
      font-size="14"
      fill="currentColor"
      opacity="0.6"
    >Darmstadt</text>
  </svg>
</template>
