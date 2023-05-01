"""This file works as the main source to check and transform the excel file into a js file with all the products in it.
Made by: Edgar RP (JefeLitman) & Lina Ruiz
Version: 1.3.3
"""

import numpy as np
import pandas as pd

#with open("./data.xlsx", 'r', encoding="utf-8") as excel:
data = pd.read_excel("./data.xlsx")

# Putting header firts
with open("./data.js", "w") as data_file:
    print("""/* 
This file contains all the generated from excel file to be imported in the webpage
Made by: Edgar RP (JefeLitman) & Lina Ruiz 
Version: 1.0
*/
""", file=data_file)

# First function to get all brands
with open("./data.js", "a") as data_file:
    print("""get_all_brands = () => {{
    return {}
}};""".format(list(data["Unternehmen"].unique())), file=data_file)

# Function to get all diagnostics fields
subsections_columns = []
for col in data.columns:
    if "Diagnostik Bereich".lower() == col.lower():
        section_column = col
    elif "Diagnostik Bereich".lower() in col.lower():
        subsections_columns.append(col)
subsections_columns

with open("./data.js", "a") as data_file:
    print("""get_diagnostics_fields = () => {{
    return {}
}};""".format(list(data[section_column].unique())), file=data_file)

subsections = []
for col in subsections_columns:
    subsections += list(data[col].unique())

cleaned_subsections = []
for sub in subsections:
    if not pd.isna(sub):
        cleaned_subsections.append(sub)

with open("./data.js", "a") as data_file:
    print("""get_diagnostics_subfields = () => {{
    return {}
}};""".format(np.unique(cleaned_subsections).tolist()), file=data_file)

reserved_columns = [
    "Unternehmen", 
    section_column, 
    "Test Bezeichung Hardware", 
    "Test Bezeichnung Verbrauchsmaterialien",
    "Kommentar"
] + subsections_columns
specific_tests = []
for col in data.columns:
    if col not in reserved_columns:
        specific_tests.append(col)
assert len(specific_tests) + len(reserved_columns) == data.shape[1]

with open("./data.js", "a") as data_file:
    print("""get_specific_tests = () => {{
    return {}
}};""".format(specific_tests), file=data_file)

all_products = []
for idx in data.index:
    company = data.loc[idx, "Unternehmen"]
    name = data.loc[idx, "Test Bezeichung Hardware"]
    disposables = data.loc[idx, "Test Bezeichnung Verbrauchsmaterialien"]
    area = data.loc[idx, section_column]
    subareas = data.loc[idx, subsections_columns]
    tests = data.loc[idx, specific_tests]
    if pd.isna(company):
        company = "N/A"
#         raise AssertionError("There is a product without company cell. Its index is {}".format(idx+2))
    if pd.isna(name):
        name = "N/A"
    if pd.isna(disposables):
        disposables = "W/O Info"
#         raise AssertionError("There is a product without any hardware or disposable elements. Its index is {}".format(idx+2))
    if pd.isna(area):
        area = "Unknow"
#         raise AssertionError("There is a product without the diagnostic field, this is mandatory. Its index is {}".format(idx+2))
    if len(subareas[~pd.isna(subareas)].values) == 0:
        subareas = ["W/O Info"]
#         raise AssertionError("There is a product without any diagnostic field detail, is mandatory to have at least one. Its index is {}".format(idx+2))
    if len(tests[~pd.isna(tests)].index) == 0:
        tests = ["W/O Info"]
#         raise AssertionError("There is a product without any specific test, is mandatory to have at least one. Its index is {}".format(idx+2))
    product = {
        "index": idx,
        "company": company,
        "name": name,
        "disposables": disposables,
        "area": area,
        "subareas": subareas if isinstance(subareas, list) else list(subareas[~pd.isna(subareas)].values),
        "tests": tests if isinstance(tests, list) else list(tests[~pd.isna(tests)].index)
    }
    all_products.append(product)

with open("./data.js", "a") as data_file:
    print("""get_all_products = () => {{
    return {}
}};""".format(all_products), file=data_file)
