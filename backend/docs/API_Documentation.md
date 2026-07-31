# AI Module

# AI Medicine Recommendation System

## Overview

The AI module provides medicine recommendations based on medicine category and common alternatives.

Instead of using a machine learning model, this project uses a rule-based recommendation system. This approach is lightweight, fast, and suitable for small-scale pharmacy applications.

---

## Objective

Recommend similar or alternative medicines when:

- A medicine is unavailable.
- A customer searches for related medicines.
- A pharmacist wants alternative suggestions.

---

## Workflow

Customer selects medicine

↓

Backend receives request

↓

Retrieve medicine category

↓

Find medicines in the same category

↓

Exclude the selected medicine

↓

Return recommended medicines

---

## Example

### Input

```json
{
    "medicine": "Crocin 500"
}
```

### Output

```json
{
    "recommended_medicines": [
        "Dolo 650",
        "Paracetamol 500"
    ]
}
```

---

## Business Logic

1. Identify the selected medicine.
2. Find its category.
3. Search other medicines belonging to the same category.
4. Return up to three alternative medicines.

---

## Advantages

- Fast recommendations
- Easy to implement
- No machine learning model required
- Low computational cost
- Suitable for pharmacy inventory systems

---

## Future Enhancements

- Integrate OpenAI or Gemini API for symptom-based recommendations.
- Use customer purchase history for personalized suggestions.
- Apply machine learning to recommend medicines based on previous orders.
- Predict medicine demand using sales trends.
