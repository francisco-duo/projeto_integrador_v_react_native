import React from "react";

import { View, StyleSheet } from "react-native";

import Button from "../components/Button";

const HomeScreen = ({ navigation }: any) => (
    <View style={styles.container}>
        <Button title="Entrar" onPress={() => navigation.navigate("Login")} />
        <Button title="Cadastre-se" onPress={() => navigation.navigate("Register")} />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    }
});

export default HomeScreen;
