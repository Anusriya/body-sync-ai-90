import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier

df = pd.read_json("PCOS_data.json", orient="records", lines=True)

df.columns = df.columns.str.strip().str.replace(' +', ' ', regex=True)

feature_cols = ['Age (yrs)', 'Weight (Kg)', 'Height(Cm)', 'Cycle(R/I)',
                'Reg.Exercise(Y/N)', 'Fast food (Y/N)']

X = df[feature_cols]
y = df['PCOS (Y/N)']
X = X.fillna(X.median(numeric_only=True))

X = pd.get_dummies(X, drop_first=True)

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

model = RandomForestClassifier(random_state=42)
model.fit(X_scaled, y)

print("Answer the following questions:")

age = float(input("Age (years): "))
weight = float(input("Weight (Kg): "))
height = float(input("Height (Cm): "))
cycle = input("Cycle Regularity (R for Regular / I for Irregular): ").upper()
exercise = int(input("Do you exercise regularly? (1 for Yes / 0 for No): "))
fast_food = int(input("Do you eat fast food often? (1 for Yes / 0 for No): "))
user_df = pd.DataFrame({
    'Age (yrs)': [age],
    'Weight (Kg)': [weight],
    'Height(Cm)': [height],
    'Cycle(R/I)': [cycle],
    'Reg.Exercise(Y/N)': [exercise],
    'Fast food (Y/N)': [fast_food]
})

user_df = pd.get_dummies(user_df)
user_df = user_df.reindex(columns=X.columns, fill_value=0)

user_scaled = scaler.transform(user_df)

prediction = model.predict(user_scaled)[0]
result = "You are likely to have PCOS." if prediction == 1 else "You are unlikely to have PCOS."
print("\nPrediction:", result)

