import { TabNavigator, StackNavigator } from 'react-navigation';

//screens
import WelcomeScreen from './screens/Welcome';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import InterestsScreen from './screens/Interests';


const MainNavigator = TabNavigator({
    register: { screen: RegisterScreen },
    interests: { screen: InterestsScreen },
    welcome: { screen: WelcomeScreen },
    login: { screen: LoginScreen },

}, {
    navigationOptions: {
        tabBarVisible: false
    }
});

export default MainNavigator;
