import { useState } from "react";

const API_URL = "http://localhost:5000";

function AddMedicineForm({
    onSuccess
}) {
    const [form, setForm] = useState({
        medicine_name: "",
        category_id: 1,
        manufacturer: "",
        stock: "",
        price: "",
        expiry_date: "",
        threshold: 20
    });

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
                e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        try {
            const response =
                await fetch(
                    `${API_URL}/api/medicines`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json"
                        },
                        body: JSON.stringify({
                            ...form,
                            category_id:
                                Number(
                                    form.category_id
                                ),
                            stock:
                                Number(
                                    form.stock
                                ),
                            price:
                                Number(
                                    form.price
                                ),
                            threshold:
                                Number(
                                    form.threshold
                                )
                        })
                    }
                );

            const result =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message ||
                        "Failed to add medicine"
                );
            }

            setMessage(
                "Medicine added successfully."
            );

            setForm({
                medicine_name: "",
                category_id: 1,
                manufacturer: "",
                stock: "",
                price: "",
                expiry_date: "",
                threshold: 20
            });

            setTimeout(() => {
                onSuccess();
            }, 700);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="form-panel">
            <div className="panel-header">
                <div>
                    <h2>Add Medicine</h2>
                    <p>
                        Add a new medicine to
                        your inventory.
                    </p>
                </div>
            </div>

            <form
                className="medicine-form"
                onSubmit={handleSubmit}
            >
                <div className="form-group">
                    <label>
                        Medicine Name
                    </label>

                    <input
                        name="medicine_name"
                        value={
                            form.medicine_name
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="e.g. Paracetamol 500mg"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>
                        Category
                    </label>

                    <select
                        name="category_id"
                        value={
                            form.category_id
                        }
                        onChange={
                            handleChange
                        }
                    >
                        <option value="1">
                            Painkiller
                        </option>

                        <option value="2">
                            Antibiotic
                        </option>

                        <option value="3">
                            Vitamin
                        </option>

                        <option value="4">
                            Diabetes
                        </option>

                        <option value="5">
                            Skin Care
                        </option>
                    </select>
                </div>

                <div className="form-group">
                    <label>
                        Manufacturer
                    </label>

                    <input
                        name="manufacturer"
                        value={
                            form.manufacturer
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="e.g. GSK"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>
                        Stock
                    </label>

                    <input
                        type="number"
                        name="stock"
                        value={form.stock}
                        onChange={
                            handleChange
                        }
                        min="0"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>
                        Price
                    </label>

                    <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={
                            handleChange
                        }
                        min="1"
                        step="0.01"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>
                        Expiry Date
                    </label>

                    <input
                        type="date"
                        name="expiry_date"
                        value={
                            form.expiry_date
                        }
                        onChange={
                            handleChange
                        }
                        required
                    />
                </div>

                <div className="form-group">
                    <label>
                        Low Stock Threshold
                    </label>

                    <input
                        type="number"
                        name="threshold"
                        value={
                            form.threshold
                        }
                        onChange={
                            handleChange
                        }
                        min="0"
                    />
                </div>

                <div className="form-actions">
                    <button
                        type="submit"
                        className="primary-button"
                    >
                        Add Medicine
                    </button>
                </div>
            </form>

            {message && (
                <div className="success-message">
                    {message}
                </div>
            )}

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}
        </div>
    );
}

export default AddMedicineForm;