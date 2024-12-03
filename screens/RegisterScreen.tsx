import React, { useState } from "react";

import { View, TextInput, StyleSheet, Alert } from "react-native";

import Button from "../components/Button";

import api from "../services/api";

const RegisterScreen = ({ navigation }: any) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            await api.post("/users/register", { name, email, password, role: "paciente" });
            Alert.alert("Cadastro realizado com sucesso!");
            navigation.navigate("Login");
        } catch (error) {
            Alert.alert("Erro ao cadastrar");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Cadastrar" onPress={handleRegister} />
            <Button title="Voltar" onPress={() => navigation.goBack()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
    },
});

export default RegisterScreen;
