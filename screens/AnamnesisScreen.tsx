import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const AnamnesisScreen = ({ navigation }: any) => {
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
        </View >
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: "bold" },
});

export default AnamnesisScreen;
