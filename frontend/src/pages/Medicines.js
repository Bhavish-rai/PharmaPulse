import { useMemo, useState } from "react";
import AddMedicineForm from "../components/AddMedicineForm";
import MedicineCard from "../components/MedicineCard";

function Medicines({
    medicines,
    onRefresh
}) {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [showForm, setShowForm] = useState(false);

    const categories = [
        ...new Set(
            medicines
                .map(
                    (medicine) =>
                        medicine.category_name
                )
                .filter(Boolean)
        )
    ];

    const filteredMedicines = useMemo(() => {
        return medicines.filter((medicine) => {
            const matchesSearch =
                medicine.medicine_name
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );

            const matchesCategory =
                category === "" ||
                medicine.category_name ===
                    category;

            return (
                matchesSearch &&
                matchesCategory
            );
        });
    }, [
        medicines,
        search,
        category
    ]);

    return (
        <div className="page">
            <div className="page-heading">
                <div>
                    <p className="eyebrow">
                        INVENTORY
                    </p>

                    <h1>Medicines</h1>

                    <p>
                        Search and manage your
                        pharmacy inventory.
                    </p>
                </div>

                <button
                    className="primary-button"
                    onClick={() =>
                        setShowForm(!showForm)
                    }
                >
                    {showForm
                        ? "Close"
                        : "+ Add Medicine"}
                </button>
            </div>

            {showForm && (
                <AddMedicineForm
                    onSuccess={() => {
                        setShowForm(false);
                        onRefresh();
                    }}
                />
            )}

            <div className="filters">
                <div className="search-box">
                    <span>⌕</span>

                    <input
                        type="text"
                        placeholder="Search medicine..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                    />
                </div>

                <select
                    value={category}
                    onChange={(e) =>
                        setCategory(
                            e.target.value
                        )
                    }
                >
                    <option value="">
                        All Categories
                    </option>

                    {categories.map(
                        (item) => (
                            <option
                                key={item}
                                value={item}
                            >
                                {item}
                            </option>
                        )
                    )}
                </select>
            </div>

            <div className="medicine-grid">
                {filteredMedicines.length ===
                0 ? (
                    <div className="empty-state full">
                        <h3>
                            No medicines found
                        </h3>

                        <p>
                            Try changing your
                            search or filter.
                        </p>
                    </div>
                ) : (
                    filteredMedicines.map(
                        (medicine) => (
                            <MedicineCard
                                key={
                                    medicine.medicine_id
                                }
                                medicine={
                                    medicine
                                }
                            />
                        )
                    )
                )}
            </div>
        </div>
    );
}

export default Medicines;