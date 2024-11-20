import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import IndexPoliceScreen from "../../screens/office_screens/home";
import PoliceHistoryScreen from "../../screens/office_screens/history";
import ProfilePage from "../../screens/office_screens/profile";

const stack = createNativeStackNavigator();

const MyStack = () => {
    return(
        <NavigationContainer>
            <StackActions.Navigator>
                <stack.Screen
                    name="PoliceHome"
                    component={IndexPoliceScreen}
                    options={{title: 'Welcome'}}
                />
                <stack.Screen
                    name="HistoryPage"
                    component={PoliceHistoryScreen}
                />
                <stack.Screen
                    name="ProfilePage"
                    component={ProfilePage}
                />
            </StackActions.Navigator>
        </NavigationContainer>
    )
}

export default MyStack;