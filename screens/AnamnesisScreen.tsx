import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";

import Collapsible from "react-native-collapsible";

import api from "../services/api";

const AnamnesisScreen = ({ navigation }: any) => {
    const [anamneses, setAnamneses] = useState([]);
    const [filteredAnamneses, setFilteredAnamneses] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedId, setExpandedId] = useState<number | null>(null);

    useEffect(() => {
        const fetchAnamneses = async () => {
            try {
                const response = await api.get("/anamneses");
                setAnamneses(response.data);
                setFilteredAnamneses(response.data);
            } catch (error) {
                console.error("Erro ao buscar anamneses:", error);
                Alert.alert("Erro", "Não foi possível carregar as anamneses.");
            }
        };

        fetchAnamneses();
    }, []);

    // Função para filtrar anamneses pelo nome do paciente
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const filtered = anamneses.filter((anamnesis: any) =>
            anamnesis.patient.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredAnamneses(filtered);
    };

    // Alternar expansão/recolhimento
    const toggleExpand = (id: number) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Anamneses</Text>
            <Button
                title="Registrar Anamnese"
                onPress={() => navigation.navigate("RegisterAnamnesis")}
            />

            <TextInput
                style={styles.searchInput}
                placeholder="Buscar pelo nome do paciente"
                value={searchQuery}
                onChangeText={handleSearch}
            />

            {/* Lista de anamneses */}
            <FlatList
                data={filteredAnamneses}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        {/* Cabeçalho do item */}
                        <TouchableOpacity onPress={() => toggleExpand(item.id)} style={styles.itemHeader}>
                            <Text style={styles.itemTitle}>{item.patient.name}</Text>
                            <Text>{expandedId === item.id ? "-" : "+"}</Text>
                        </TouchableOpacity>

                        {/* Conteúdo expandido */}
                        <Collapsible collapsed={expandedId !== item.id}>
                            <View style={styles.itemContent}>
                                <Text>
                                    <Text style={styles.bold}>Descrição:</Text> {item.description}
                                </Text>
                                <Text>
                                    <Text style={styles.bold}>Data:</Text>{" "}
                                    {new Date(item.date).toLocaleDateString()}
                                </Text>
                                <Text>
                                    <Text style={styles.bold}>Psicólogo:</Text> {item.psychologist.name}
                                </Text>
                            </View>
                        </Collapsible>
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
        marginBottom: 20,
    },
    searchInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    itemContainer: {
        marginBottom: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    itemHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: "#f7f7f7",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    itemContent: {
        padding: 10,
    },
    bold: {
        fontWeight: "bold",
    },
});

export default AnamnesisScreen;
