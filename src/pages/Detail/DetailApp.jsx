import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Detail from "Detail";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Detail />
  </StrictMode>,
)
