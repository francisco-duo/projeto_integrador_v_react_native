import React, { useState } from "react";

import { View, TextInput, StyleSheet, Text, Alert } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Button from "../components/Button";

import api from "../services/api";

const LoginScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = api.post("/login", { email, password });
            const { token, role, userId } = (await response).data;

            // console.log(response);

            await AsyncStorage.setItem("token", token);
            await AsyncStorage.setItem("role", role);
            await AsyncStorage.setItem("userId", String(userId));

            // console.log(userId)

            navigation.navigate("Dashboard");
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                Alert.alert("Erro", "Email ou senha inválidos");
            } else {
                Alert.alert("Erro", "Ocorreu um problema ao realizar login");
                console.log(error);
            }
        }
    };

    return (
        <View style={styles.container}>
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
            <Button title="Entrar" onPress={handleLogin} />
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

export default LoginScreen;
