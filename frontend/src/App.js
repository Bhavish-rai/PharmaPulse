import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Medicines from "./pages/Medicines";
import "./index.css";
import ChatBot from "./components/ChatBot";
const API_URL = "http://localhost:5000";

function App() {
    const [activePage, setActivePage] = useState("dashboard");
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchMedicines = async () => {
        try {
            setLoading(true);

            const response = await fetch(
                `${API_URL}/api/medicines`
            );

            const result = await response.json();

            if (result.success) {
                setMedicines(
                    result.data.medicines || []
                );
            }
        } catch (error) {
            console.error(
                "Failed to fetch medicines:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMedicines();
    }, []);

    return (
        <div className="app">
            <nav className="navbar">
                <div
                    className="brand"
                    onClick={() =>
                        setActivePage("dashboard")
                    }
                >
                    <div className="brand-icon">M</div>

                    <div>
                        <h2>MediStock</h2>
                        <span>Pharmacy Management</span>
                    </div>
                </div>

                <div className="nav-links">
                    <button
                        className={
                            activePage === "dashboard"
                                ? "nav-link active"
                                : "nav-link"
                        }
                        onClick={() =>
                            setActivePage("dashboard")
                        }
                    >
                        Dashboard
                    </button>

                    <button
                        className={
                            activePage === "medicines"
                                ? "nav-link active"
                                : "nav-link"
                        }
                        onClick={() =>
                            setActivePage("medicines")
                        }
                    >
                        Medicines
                    </button>
                </div>

                <div className="status">
                    <span className="status-dot"></span>
                    System Online
                </div>
            </nav>

            <main className="main-content">
                {activePage === "dashboard" && (
                    <Dashboard
                        medicines={medicines}
                        loading={loading}
                        onRefresh={fetchMedicines}
                        onNavigate={
                            setActivePage
                        }
                    />
                )}

                {activePage === "medicines" && (
                    <Medicines
                        medicines={medicines}
                        onRefresh={fetchMedicines}
                    />
                )}
                <ChatBot />
            </main>
        </div>
    );
}

export default App;