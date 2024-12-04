import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import api from "../services/api";
import SearchableDropdown from "react-native-searchable-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";

const RegisterAnamnesis = ({ navigation }: any) => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [patients, setPatients] = useState([]); // Lista de pacientes
    const [selectedPatient, setSelectedPatient] = useState(null); // Paciente selecionado
    const [date, setDate] = useState<Date | null>(null); // Data selecionada
    const [showDatePicker, setShowDatePicker] = useState(false); // Controle do DatePicker

    // Carregar a lista de pacientes ao montar o componente
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await api.get("/patients");
                setPatients(response.data.map((patient: any) => ({
                    id: patient.id,
                    name: patient.name,
                })));
            } catch (error) {
                console.error("Erro ao buscar pacientes:", error);
            }
        };

        fetchPatients();
    }, []);

    const onSubmit = async (data: any) => {
        if (!selectedPatient) {
            Alert.alert("Erro", "Por favor, selecione um paciente.");
            return;
        }

        if (!date) {
            Alert.alert("Erro", "Por favor, selecione uma data.");
            return;
        }

        // Validação da data para impedir datas futuras
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Zera horas para comparar apenas datas
        if (date > today) {
            Alert.alert("Erro", "A data não pode estar no futuro.");
            return;
        }

        try {
            await api.post("/anamneses", { ...data, patientId: selectedPatient.id, date });
            Alert.alert("Sucesso", "Anamnese registrada com sucesso!");
            navigation.goBack();
        } catch (error) {
            console.error("Erro ao registrar anamnese:", error);
            Alert.alert("Erro", "Não foi possível registrar a anamnese.");
        }
    };

    const onDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registrar Anamnese</Text>

            <Text>Descrição</Text>
            <Controller
                control={control}
                name="description"
                rules={{ required: "Descrição é obrigatória" }}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={[styles.input, errors.description && styles.errorInput]}
                        placeholder="Descrição"
                        value={value}
                        onChangeText={onChange}
                    />
                )}
            />
            {errors.description && <Text style={styles.errorText}>{errors.description.message}</Text>}

            <Text>Data</Text>
            <Button title={date ? date.toLocaleDateString() : "Selecionar Data"} onPress={() => setShowDatePicker(true)} />
            {showDatePicker && (
                <DateTimePicker
                    value={date || new Date()}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={onDateChange}
                />
            )}

            <Text>Selecionar Paciente</Text>
            <SearchableDropdown
                onItemSelect={(item: any) => setSelectedPatient(item)}
                items={patients}
                defaultIndex={-1}
                placeholder="Buscar paciente..."
                resetValue={false}
                textInputProps={{
                    underlineColorAndroid: "transparent",
                    style: styles.input,
                }}
                itemStyle={{
                    padding: 10,
                    marginTop: 2,
                    backgroundColor: "#FAFAFA",
                    borderColor: "#ccc",
                    borderWidth: 1,
                    borderRadius: 5,
                }}
                itemTextStyle={{ color: "#222" }}
            />
            {selectedPatient && (
                <Text style={{ marginVertical: 10 }}>
                    Paciente Selecionado: {selectedPatient.name}
                </Text>
            )}

            <Button title="Registrar" onPress={handleSubmit(onSubmit)} />
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
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    errorInput: {
        borderColor: "red",
    },
    errorText: {
        color: "red",
        marginBottom: 10,
    },
});

export default RegisterAnamnesis;
