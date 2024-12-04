import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import AnamnesisScreen from "./AnamnesisScreen";
import EvolutionsScreen from "./EvolutionsScreen";
import ScheduleScreen from "./ScheduleScreen";

const Tab = createMaterialTopTabNavigator();

const PsychologistScreen = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Anamneses" component={AnamnesisScreen} />
            <Tab.Screen name="Evoluções" component={EvolutionsScreen} />
            <Tab.Screen name="Agendar" component={ScheduleScreen} />
        </Tab.Navigator>
    );
};

export default PsychologistScreen;
