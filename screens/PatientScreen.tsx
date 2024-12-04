import React, { useEffect, useState } from "react";

import { View, Text, FlatList, StyleSheet, Alert } from "react-native";

import api from "../services/api";

const PatientScreen = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await api.get("/agendas");
                setAppointments(response.data);
            } catch (error) {
                Alert.alert("Erro", "Não foi possível carregar as consultas.");
            }
        };
        fetchAppointments();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Minhas Consultas</Text>
            <FlatList
                data={appointments}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text>Data: {item.date}</Text>
                        <Text>Psicólogo: {item.psychologistName}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    card: {
        padding: 15,
        marginVertical: 5,
        backgroundColor: "#f9f9f9",
        borderRadius: 5,
    },
});