import Colors from "@/data/Colors";
import { StyleSheet } from "react-native";

const patronStyles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  statBox: {
    alignItems: "center",
    width: "30%",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  statLabel: {
    fontSize: 14,
    color: "#777",
  },
  saveButton: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 10,
  },
  changeImageText: {
    color: Colors.PRIMARY,
    textAlign: "center",
    fontSize: 14,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  subTitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  section: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
  },
  disabledInput: {
    backgroundColor: "#eee",
    color: "#aaa",
  },

  cancelButton: {
    backgroundColor: "#e74c3c",
  },
});

export default patronStyles;
