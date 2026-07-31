function MedicineCard({ medicine }) {
    const lowStock =
        Number(medicine.stock) <=
        Number(medicine.threshold);

    return (
        <div className="medicine-card">
            <div className="medicine-top">
                <div className="medicine-symbol">
                    Rx
                </div>

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
            </div>

            <h3>
                {medicine.medicine_name}
            </h3>

            <p className="manufacturer">
                {medicine.manufacturer}
            </p>

            <div className="medicine-info">
                <div>
                    <span>Category</span>
                    <strong>
                        {medicine.category_name}
                    </strong>
                </div>

                <div>
                    <span>Stock</span>
                    <strong>
                        {medicine.stock}
                    </strong>
                </div>

                <div>
                    <span>Price</span>
                    <strong>
                        ₹{medicine.price}
                    </strong>
                </div>
            </div>

            <div className="expiry">
                <span>Expiry</span>
                <strong>
                    {medicine.expiry_date}
                </strong>
            </div>
        </div>
    );
}

export default MedicineCard;