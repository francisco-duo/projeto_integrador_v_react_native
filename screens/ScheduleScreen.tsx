import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const ScheduleScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Agendar Consulta</Text>
            {/* Formulário para agendamento */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: "bold" },
});

export default ScheduleScreen;
