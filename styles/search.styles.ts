import { StyleSheet } from "react-native";

const searchStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f8f9fa",
  },
  filters: {
    marginBottom: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  heading: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#d9534f",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#f1f1f1",
    padding: 7,
    borderRadius: 6,
    marginBottom: 7,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  picker: {
    marginBottom: 7,
    padding: 0,
  },
  pickerText: {
    fontSize: 10,
    padding: 0,
  },
  row: {
    flexDirection: "row",
    gap: 5,
    padding: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  cell: {
    flex: 1,
    fontSize: 11,
    color: "#333",
  },
});

export default searchStyles;
