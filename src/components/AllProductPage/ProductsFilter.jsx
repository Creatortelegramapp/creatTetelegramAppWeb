export default function ProductsFilter({
                                           categories,
                                           selectedCategories,
                                           checkboxHandler,
                                       }) {
    return (
        <div className="filter-section">
            {categories.map((category) => (
                <div key={category.id} className="checkbox-item flex items-center space-x-2">
                    <label htmlFor={category.id}>{category.name}</label>
                    <input
                        type="checkbox"
                        id={category.id}
                        name={category.name}
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => checkboxHandler(category.id)}
                    />
                </div>
            ))}
        </div>
    );
}
