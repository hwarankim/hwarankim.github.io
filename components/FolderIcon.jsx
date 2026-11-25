// The folder, drawn on a 512 x 416 board so its colors come from tokens: each page's own color
// inside a .page-* scope, the accent anywhere else. FolderIcon is the closed folder; the opening
// animation (FolderTransition) uses its back and front halves separately.

const BACK = 'M28 40Q28 20 48 20H190Q204 20 212 32L230 58H464Q484 58 484 78V372Q484 392 464 392H48Q28 392 28 372Z';
const PAPER = 'M52 64H462V380H52Z';
// the sheet that grows to fill the screen in the opening animation: x 40-472, y 76-392
const SHEET = 'M40 76H472V392H40Z';
const FRONT = 'M20 118Q20 100 38 100H474Q492 100 492 118V376Q492 396 472 396H40Q20 396 20 376Z';
const BAND = 'M20 118Q20 100 38 100H474Q492 100 492 118V126H20Z';

const board = { viewBox: '0 0 512 416', width: 512, height: 416, focusable: 'false' };

function Back() {
  return (
    <>
      <path className="folder-icon-back" d={BACK} />
      <path className="folder-icon-paper" d={PAPER} />
      <path className="folder-icon-sheet" d={SHEET} />
    </>
  );
}

function Front() {
  return (
    <>
      <path className="folder-icon-front" d={FRONT} />
      <path className="folder-icon-band" d={BAND} />
    </>
  );
}

// Pass `label` when the icon names something; otherwise it is decoration and hidden.
export default function FolderIcon({ className = '', label }) {
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': 'true' };
  return (
    <svg className={`folder-icon ${className}`.trim()} {...board} {...a11y}>
      <Back />
      <Front />
    </svg>
  );
}

export function FolderBackArt({ className = '' }) {
  return (
    <svg className={`folder-icon ${className}`.trim()} {...board} aria-hidden="true">
      <Back />
    </svg>
  );
}

// The front cover swings open on its own, so the animation needs a ref to it.
export function FolderFrontArt({ className = '', style, ref }) {
  return (
    <svg className={`folder-icon ${className}`.trim()} {...board} style={style} ref={ref} aria-hidden="true">
      <Front />
    </svg>
  );
}
