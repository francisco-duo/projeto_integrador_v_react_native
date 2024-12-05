import React, { useEffect, useState } from "react";

import { View, Text, FlatList, StyleSheet, Alert } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../services/api";


interface Anamnesis {
    id: number;
    description: string;
    date: string;
    patient: {
        name: string;
    };
    psychologist: {
        name: string;
    };
}

const AnamnesisListScreen = () => {
    const [anamneses, setAnamneses] = useState<Anamnesis[]>([]);

    useEffect(() => {
        const fetchAnamneses = async () => {
            try {
                const userId = await AsyncStorage.getItem("userId");
                const response = await api.get(`/anamneses/psycho/${userId}`);
                setAnamneses(response.data);
            } catch (error) {
                console.error("Erro ao carregar anamneses:", error);
                Alert.alert("Erro", "Não foi possível carregar as anamneses.");
            }
        };

        fetchAnamneses();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Minhas Anamneses</Text>

            {anamneses.length > 0 ? (
                <FlatList
                    data={anamneses}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            {/* <Text style={styles.itemText}>Paciente: {item.patient.name}</Text> */}
                            <Text style={styles.itemText}>Descrição: {item.description}</Text>
                            <Text style={styles.itemText}>Data: {new Date(item.date).toLocaleDateString()}</Text>
                            <Text style={styles.itemText}>Psicólogo: {item.psychologist.name}</Text>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.noData}>Nenhuma anamnese encontrada</Text>
            )}
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
        marginBottom: 20,
    },
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        backgroundColor: "#fff",
    },
    itemText: {
        fontSize: 16,
    },
    noData: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 18,
        color: "#999",
    },
});

export default AnamnesisListScreen;
