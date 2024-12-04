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
            {/* Lista de anamneses seria carregada aqui */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: "bold" },
});

export default AnamnesisScreen;
