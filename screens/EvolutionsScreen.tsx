import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const EvolutionsScreen = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Evoluções</Text>
            <Button
                title="Registrar Evolução"
                onPress={() => navigation.navigate("RegisterEvolution")}
            />
            {/* Lista de evoluções seria carregada aqui */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: "bold" },
});

export default EvolutionsScreen;
