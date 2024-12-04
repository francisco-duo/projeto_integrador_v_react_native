import React, { useEffect, useState } from "react";

import { View, Text, StyleSheet, Alert, ActivityIndicator } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Button from "../components/Button";

const DashboardScreen = ({ navigation }: any) => {
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fecthUserRole = async () => {
            try {
                const storeRole = await AsyncStorage.getItem("role");

                console.log("\nRole recuperada: \n", storeRole);

                setRole(storeRole);
            } catch (error: any) {
                Alert.alert("Erro", "Não foi possível recuperar o tipo de usuário.");

                console.log("Falha ao recuperar a role: ", error)
            } finally {
                setLoading(false);
            }
        };
        fecthUserRole();
    }, []);

    if (!role) {
        // Exibir um carregamento ou algo enquanto recupera a role
        return (
            <View style={styles.container}>
                <Text>Carregando...</Text>
            </View>
        );
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo ao Dashboard</Text>
            {role === "Patient" && (
                <Button
                    title="Minhas Consultas"
                    onPress={() => navigation.navigate("Patient")}
                />
            )}
            {role === "Psychologist" && (
                <>
                    <Button
                        title="Anamneses"
                        onPress={() => navigation.navigate("Psychologist", { screen: "Anamneses" })}
                    />
                    <Button
                        title="Evoluções"
                        onPress={() => navigation.navigate("Psychologist", { screen: "Evolutions" })}
                    />
                    <Button
                        title="Agendar Consulta"
                        onPress={() => navigation.navigate("Psychologist", { screen: "Schedule" })}
                    />
                </>
            )}
            {role === "Admin" && (
                <>
                    <Button
                        title="Gerenciar Usuários"
                        onPress={() => navigation.navigate("Admin", { screen: "ManageUsers" })}
                    />
                    <Button
                        title="Gerenciar Agendamentos"
                        onPress={() => navigation.navigate("Admin", { screen: "ManageAppointments" })}
                    />
                </>
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default DashboardScreen;
