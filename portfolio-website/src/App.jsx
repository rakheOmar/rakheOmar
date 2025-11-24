import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import PortfolioDock from "@/components/portfolio/FloatingDock";

import Portfolio from "@/pages/Portfolio";

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <div className="absolute inset-0 w-full h-full bg-background -z-10" />

      <div className="min-h-screen font-sans antialiased max-w-3xl mx-auto py-12 sm:py-24 px-6 pb-32 relative z-10 bg-background">
        <main className="flex-1">{children}</main>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 pointer-events-none flex justify-center">
        <div className="pointer-events-auto">
          <PortfolioDock />
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Portfolio />} />
        </Routes>
        <SpeedInsights />
        <Analytics />
      </Layout>
    </Router>
  );
}

export default App;
