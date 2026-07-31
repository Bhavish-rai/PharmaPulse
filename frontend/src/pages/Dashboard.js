import { useMemo } from "react";

function Dashboard({
    medicines,
    loading,
    onRefresh,
    onNavigate
}) {
    const lowStockCount = useMemo(() => {
        return medicines.filter(
            (medicine) =>
                Number(medicine.stock) <=
                Number(medicine.threshold)
        ).length;
    }, [medicines]);

    const totalStock = useMemo(() => {
        return medicines.reduce(
            (total, medicine) =>
                total + Number(medicine.stock || 0),
            0
        );
    }, [medicines]);

    const inventoryValue = useMemo(() => {
        return medicines.reduce(
            (total, medicine) =>
                total +
                Number(medicine.stock || 0) *
                Number(medicine.price || 0),
            0
        );
    }, [medicines]);

    return (
        <div className="page">
            <section className="hero">
                <div>
                    <p className="eyebrow">
                        PHARMACY OPERATIONS
                    </p>

                    <h1>
                        Welcome to MediStock
                    </h1>

                    <p className="hero-text">
                        Manage medicines, monitor
                        inventory and keep your
                        pharmacy running smoothly.
                    </p>
                </div>

                <button
                    className="primary-button"
                    onClick={() =>
                        onNavigate("medicines")
                    }
                >
                    Manage Medicines
                </button>
            </section>

            <section className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon blue">
                        M
                    </div>

                    <div>
                        <p>Total Medicines</p>
                        <h3>
                            {loading
                                ? "..."
                                : medicines.length}
                        </h3>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon orange">
                        !
                    </div>

                    <div>
                        <p>Low Stock</p>
                        <h3>{lowStockCount}</h3>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon green">
                        S
                    </div>

                    <div>
                        <p>Total Stock</p>
                        <h3>{totalStock}</h3>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon purple">
                        ₹
                    </div>

                    <div>
                        <p>Inventory Value</p>
                        <h3>
                            ₹
                            {inventoryValue.toLocaleString(
                                "en-IN"
                            )}
                        </h3>
                    </div>
                </div>
            </section>

            <section className="content-grid">
                <div className="panel">
                    <div className="panel-header">
                        <div>
                            <h2>Inventory Overview</h2>
                            <p>
                                Current medicine
                                availability
                            </p>
                        </div>

                        <button
                            className="refresh-button"
                            onClick={onRefresh}
                        >
                            Refresh
                        </button>
                    </div>

                    {medicines.length === 0 ? (
                        <div className="empty-state">
                            <h3>
                                No medicines found
                            </h3>

                            <p>
                                Add medicines to
                                start managing your
                                inventory.
                            </p>
                        </div>
                    ) : (
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            Medicine
                                        </th>
                                        <th>
                                            Category
                                        </th>
                                        <th>
                                            Stock
                                        </th>
                                        <th>
                                            Price
                                        </th>
                                        <th>
                                            Status
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {medicines
                                        .slice(0, 6)
                                        .map(
                                            (
                                                medicine
                                            ) => {
                                                const lowStock =
                                                    Number(
                                                        medicine.stock
                                                    ) <=
                                                    Number(
                                                        medicine.threshold
                                                    );

                                                return (
                                                    <tr
                                                        key={
                                                            medicine.medicine_id
                                                        }
                                                    >
                                                        <td>
                                                            <strong>
                                                                {
                                                                    medicine.medicine_name
                                                                }
                                                            </strong>
                                                        </td>

                                                        <td>
                                                            {
                                                                medicine.category_name
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                medicine.stock
                                                            }
                                                        </td>

                                                        <td>
                                                            ₹
                                                            {
                                                                medicine.price
                                                            }
                                                        </td>

                                                        <td>
                                                            <span
                                                                className={
                                                                    lowStock
                                                                        ? "badge danger"
                                                                        : "badge success"
                                                                }
                                                            >
                                                                {lowStock
                                                                    ? "Low Stock"
                                                                    : "Available"}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <div className="panel quick-panel">
                    <h2>Quick Actions</h2>
                    <p>
                        Common pharmacy operations
                    </p>

                    <button
                        className="action-card"
                        onClick={() =>
                            onNavigate(
                                "medicines"
                            )
                        }
                    >
                        <div className="action-icon">
                            +
                        </div>

                        <div>
                            <strong>
                                Add Medicine
                            </strong>

                            <span>
                                Add a new medicine
                                to inventory
                            </span>
                        </div>
                    </button>

                    <button
                        className="action-card"
                        onClick={() =>
                            onNavigate(
                                "medicines"
                            )
                        }
                    >
                        <div className="action-icon">
                            S
                        </div>

                        <div>
                            <strong>
                                View Inventory
                            </strong>

                            <span>
                                Search and filter
                                medicines
                            </span>
                        </div>
                    </button>

                    <button
                        className="action-card"
                        onClick={onRefresh}
                    >
                        <div className="action-icon">
                            ↻
                        </div>

                        <div>
                            <strong>
                                Refresh Data
                            </strong>

                            <span>
                                Sync latest
                                inventory data
                            </span>
                        </div>
                    </button>
                </div>
            </section>
        </div>
    );
}

export default Dashboard;