import { MemoryRouter } from "react-router-dom";
import App from "~/popup/App";

function IndexPopup() {
  return (
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
}

export default IndexPopup;