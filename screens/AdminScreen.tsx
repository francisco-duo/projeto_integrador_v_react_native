import React from "react";
import { View, Button, StyleSheet } from "react-native";

const AdminScreen = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <Button
                title="Criar Usuário"
                onPress={() => navigation.navigate("CreateUser")}
            />
            <Button
                title="Gerenciar Agendamentos"
                onPress={() => navigation.navigate("ManageAppointments")}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
});

export default AdminScreen;
